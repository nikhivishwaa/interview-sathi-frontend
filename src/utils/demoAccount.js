// Demo account credentials
export const DEMO_USER = {
    id: "demo-user-123",
    email: "demo@interviewsathi.com",
    first_name: "Demo",
    gender: "m",
    college: "Demo University",
    phone: "9876543210"
  };
  
  // Mock upcoming interviews for demo account
  export const DEMO_UPCOMING_INTERVIEWS = [
    {
      id: "demo-interview-1",
      title: "Frontend Developer Interview",
      date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      duration: 30,
      status: "scheduled"
    },
    {
      id: "demo-interview-2",
      title: "Backend Developer Interview",
      date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
      duration: 45,
      status: "scheduled"
    }
  ];
  
  // Mock past interviews for demo account
  export const DEMO_PAST_INTERVIEWS = [
    {
      id: "demo-past-1",
      title: "React Developer Practice",
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      duration: 30,
      status: "completed",
      score: 82
    },
    {
      id: "demo-past-2",
      title: "Node.js Developer Practice",
      date: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
      duration: 40,
      status: "completed",
      score: 78
    }
  ];
  
  // Mock feedback for demo account
  export const DEMO_FEEDBACK = [
    {
      id: "demo-feedback-1",
      interview_id: "demo-past-1",
      title: "React Developer Practice",
      date: new Date(Date.now() - 172800000).toISOString(),
      overall_score: 82,
      categories: [
        { name: "Technical Skills", score: 85 },
        { name: "Communication", score: 80 },
        { name: "Problem Solving", score: 78 }
      ],
      strengths: [
        "Good understanding of React fundamentals",
        "Clear explanation of component lifecycle"
      ],
      improvements: [
        "Could improve knowledge of React hooks",
        "Work on explaining complex concepts more simply"
      ]
    },
    {
      id: "demo-feedback-2",
      interview_id: "demo-past-2",
      title: "Node.js Developer Practice",
      date: new Date(Date.now() - 432000000).toISOString(),
      overall_score: 78,
      categories: [
        { name: "Technical Skills", score: 75 },
        { name: "Communication", score: 82 },
        { name: "Problem Solving", score: 76 }
      ],
      strengths: [
        "Good understanding of asynchronous programming",
        "Explained REST API design well"
      ],
      improvements: [
        "Could improve knowledge of Node.js streams",
        "Review database optimization techniques"
      ]
    }
  ];