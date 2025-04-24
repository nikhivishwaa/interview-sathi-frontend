import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import CustomModal from "../modals/CustomModal";
import { useInterview } from "../../context/InterviewContext";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND;
const ScheduleInterview = () => {
  const [dateTime, setDateTime] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [jobRole, setJobRole] = useState("frontend");
  const [jd, setJD] = useState("");
  const [scheduling, setScheduling] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { resumes, interview, setInterview } = useInterview();

  // Calculate min date (today)
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  // Calculate max date (14 Days from now)
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 14);
  const maxDateString = maxDate.toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      toast.error("Please select Date");
      return;
    }
    if (!time) {
      toast.error("Please select Time");
      return;
    }
    if (!resumeId) {
      toast.error("Please Select a Resume");
      return;
    }
    if (!(jd.length > 30)) {
      toast.error("Please Enter Valid Job Description");
      return;
    }
    if (!validateDateTime(date, time)) {
      toast.error("Please select a valid date and time in the future");
      return;
    } else {
      const schedule = new Date(`${date}T${time}`).toJSON();
      setDateTime(schedule);
      setScheduling(true);
      scheduleInterview(schedule);
      navigate("/dashboard");
    }
  };

  const validateDateTime = (date, time) => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    return selectedDateTime > currentDateTime;
  };

  const scheduleInterview = async (scheduled_at) => {
    try {
      const response = await axios.post(
        `${API}/interviews/`,
        {
          resume_id: resumeId,
          scheduled_at: scheduled_at,
          role: jobRole,
          job_desc: jd,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        console.log({ data: response.data });
        toast.success("Interview Scheduled Successfully");
        setInterview([...interview, response.data?.data]);
      }
    } catch (error) {
      console.error("Error scheduling interview:", error);
      if (error?.response?.status === 400)
        toast.error(
          error?.response ? data?.message : "Error scheduling interview"
        );
    } finally {
      setScheduling(false);
    }
  };

  return (
    <CustomModal>
      <div className="max-w-md mx-auto sathi-card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Schedule an Interview
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="jobRole"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Role
            </label>
            <select
              id="jobRole"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="sathi-input"
              required
            >
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
            </select>
          </div>

          <div className="flex gap-3">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={minDate}
                max={maxDateString}
                className="sathi-input"
                required
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                min={new Date().getTime()}
                className="sathi-input"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Resume
            </label>
            <div className="flex flex-col gap-1">
              {resumes.map((r) => (
                <label
                  htmlFor={`res-${r.id}`}
                  className="sathi-input capitalize"
                  key={r.id}
                >
                  <input
                    type="radio"
                    id={`res-${r.id}`}
                    name="resume_id"
                    value={r.id}
                    onChange={(e) => setResumeId(e.target.value)}
                  />
                  📄{r.name.length >= 9 ? r.name.slice(0, 9) + "..." : r.name} -{" "}
                  {new Date(r.uploaded_at).toLocaleDateString()}{" "}
                  <button onClick={() => window.open(`${API}${r.file}`)}>
                    ↗️
                  </button>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="jd"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Description
            </label>
            <textarea
              rows={4}
              id="jd"
              value={jd}
              onChange={(e) => setJD(e.target.value)}
              className="sathi-input"
              required={true}
              minLength={10}
              placeholder="Job Description"
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={scheduling}
              className="sathi-btn-primary w-full"
            >
              {scheduling ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                  Scheduling...
                </>
              ) : (
                "Schedule Interview"
              )}
            </button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export default ScheduleInterview;
