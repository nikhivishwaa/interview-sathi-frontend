import React from "react";
import { Link } from "react-router-dom";
import {
  feedbackImpovementSvg,
  feedbackStrengthSvg,
} from "../../data/SvgImageData";

const FeedbackDetail = ({ feedback }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="sathi-card mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Interview Feedback
          </h2>
          <Link
            to="/dashboard"
            className="text-sathi-primary text-sm font-medium hover:underline mt-2 md:mt-0"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg h-full">
              <h3 className="font-medium text-gray-900 mb-3">
                Overall Performance
              </h3>

              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-sathi-primary flex items-center justify-center text-white font-bold text-lg">
                  {feedback.overallScore}%
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">
                    {feedback.overallScore >= 90
                      ? "Excellent"
                      : feedback.overallScore >= 75
                      ? "Good"
                      : feedback.overallScore >= 50
                      ? "Average"
                      : feedback.overallScore > 20
                      ? "Needs Improvement"
                      : "Poor"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Overall Assessment
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">Technical</span>
                    <span className="text-sm font-medium text-gray-900">
                      {feedback.technicalScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-sathi-primary rounded-full h-2"
                      style={{ width: `${feedback.technicalScore}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">Communication</span>
                    <span className="text-sm font-medium text-gray-900">
                      {feedback.communicationScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-sathi-primary rounded-full h-2"
                      style={{ width: `${feedback.communicationScore}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">Relevance</span>
                    <span className="text-sm font-medium text-gray-900">
                      {feedback.relevanceScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-sathi-primary rounded-full h-2"
                      style={{ width: `${feedback.relevanceScore}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">Grammar</span>
                    <span className="text-sm font-medium text-gray-900">
                      {feedback.grammarScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-sathi-primary rounded-full h-2"
                      style={{ width: `${feedback.grammarScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-6">
            <div className="h-full">
              {feedback.strengths.length > 0 && (
                <h3 className="font-medium text-gray-900 mb-3">Strengths</h3>
              )}
              <ul className="space-y-2 mb-6">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    {feedbackStrengthSvg}
                    <span className="text-sm text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>

              {feedback.improvements?.length > 0 && (
                <h3 className="font-medium text-gray-900 mb-3">
                  Areas for Improvement
                </h3>
              )}
              <ul className="space-y-2">
                {feedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    {feedbackImpovementSvg}
                    <span className="text-sm text-gray-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {feedback?.behavioralFeedback && <div className="border-t border-gray-200 pt-6 mt-2">
          <h3 className="font-medium text-gray-900 mb-3">Behavioral Feedback</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {feedback?.behavioralFeedback}
          </p>
        </div>}
        <div className="border-t border-gray-200 pt-6 mt-2">
          <h3 className="font-medium text-gray-900 mb-3">Detailed Feedback</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {feedback?.detailedFeedback}
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/interviews/schedule"
          className="sathi-btn-primary inline-flex"
        >
          Schedule Another Interview
        </Link>
      </div>
    </div>
  );
};

export default FeedbackDetail;
