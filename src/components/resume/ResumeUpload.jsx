import React, { useState, useRef, useEffect } from "react";
import { uploadResume, getResumes } from "../../api/api";
import { toast } from "sonner";
import { useInterview } from "../../context/InterviewContext";
import CustomModal from "../modals/CustomModal";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const API = import.meta.env.VITE_BACKEND;
const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const { resumes, getResumes, setResumes } = useInterview();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [newName, setNewName] = useState(false);
  const selectedResume = useRef(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const data = await getResumes();
    } catch (error) {
      console.error("Error fetching resumes:", error);
      toast.error("Failed to load your resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Check if file is PDF
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }

      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    try {
      setUploading(true);
      await uploadResume(file);
      toast.success("Resume uploaded successfully");
      setFile(null);
      fetchResumes();

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

  const handleRenameResume = async (resume_id, name) => {
    try {
      setIsEditingEnabled(false);
      const response = await axios.put(
        `${API}/resumes/${resume_id}/`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 202) {
        toast.success("Resume renamed successfully");
        const updatedResume = resumes.map((resume) => {
          if (resume.id === resume_id) {
            return response.data?.data;
          } else return resume;
        });
        setResumes(updatedResume);
        secureLocalStorage.setItem("resumes", JSON.stringify(updatedResume));
      }
    } catch (error) {
      console.error("Error renaming resume:", error);
      toast.error("Failed to rename resume");
      setIsEditingEnabled(true);
    } finally {
      setIsModalOpen(false);
      selectedResume.current = null;
    }
  };

  return (
    <div className="sathi-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Resume Management
      </h3>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>

          <div className="mt-4">
            <label className="sathi-btn-primary inline-flex cursor-pointer">
              <span>Select Resume (PDF)</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </label>
          </div>

          {file && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Selected file: {file.name}
              </p>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="mt-2 sathi-btn-secondary inline-flex text-sm"
              >
                {uploading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  "Upload Resume"
                )}
              </button>
            </div>
          )}

          <p className="mt-2 text-xs text-gray-500">
            Upload your resume in PDF format (max 5MB)
          </p>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">Your Resumes</h4>

          {loading ? (
            <div className="animate-pulse space-y-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 border rounded-md"
                >
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/5"></div>
                </div>
              ))}
            </div>
          ) : resumes.length === 0 ? (
            <p className="text-sm text-gray-500 py-3">
              No resumes uploaded yet
            </p>
          ) : (
            <div className="space-y-2">
              {resumes.map((resume, index) => (
                <div
                  key={resume.id}
                  className="flex justify-between items-center p-3 border rounded-md"
                  onClick={() => {
                    setIsModalOpen(true);
                    selectedResume.current = resume;
                    setNewName(resume.name);
                    setIsEditingEnabled(false);
                  }}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-gray-700 capitalize">
                      {resume.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(resume.uploaded_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
          {isModalOpen && (
            <CustomModal>
              <h4 className="text-lg font-semibold mb-4">Resume Details</h4>

              <label
                className="text-sm text-gray-500 mb-3"
                htmlFor="resume-name"
              >
                Resume Name:
              </label>
              <input
                name="name"
                id="resume-name"
                value={newName}
                readOnly={!isEditingEnabled}
                onChange={(e) => setNewName(e.target.value)}
                className="sathi-input"
                style={{
                  borderColor: !newName.length ? "#555" : "red",
                }}
              />
              <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
                {newName.length === 0 && "Please enter a name for the resume"}
              </span>

              <div className="flex grid-cols-2 items-center gap-2 mt-4 text-[12px]">
                ⬆️ Uploaded On:
                <span className="text-gray-500">
                  {new Date(
                    selectedResume.current?.uploaded_at
                  ).toLocaleDateString()}
                </span>
              </div>
              {new Date(
                selectedResume.current?.uploaded_at
              ).toLocaleDateString() !==
                new Date(
                  selectedResume.current?.last_updated
                ).toLocaleDateString() && (
                <div className="flex items-center gap-2 mt-1 mb-4 text-[12px]">
                  🕒 Updated On:
                  <span className="text-gray-500">
                    {new Date(
                      selectedResume.current?.last_updated
                    ).toLocaleDateString()}
                  </span>
                </div>
              )}
              {isEditingEnabled ? (
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setIsEditingEnabled(false);
                      setNewName(selectedResume.current?.name);
                    }}
                    className="mt-4 sathi-btn-secondary cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (newName.length === 0) {
                        toast.error("Please Enter a Name for the Resume");
                        return;
                      }
                      handleRenameResume(selectedResume.current?.id, newName);
                    }}
                    className="mt-4 sathi-btn-primary cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setIsEditingEnabled(true);
                    }}
                    className="mt-4  sathi-btn-secondary cursor-pointer"
                  >
                    Rename
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      selectedResume.current = null;
                    }}
                    className="mt-4 sathi-btn-primary cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              )}
            </CustomModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
