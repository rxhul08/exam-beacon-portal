
export const mockCandidateResults = [
  {
    id: 1,
    email: "john.doe@company.com",
    score: 24,
    totalQuestions: 30,
    percentage: 80,
    grade: "A",
    completedAt: "2024-01-15T10:30:00Z",
    answers: [
      {
        questionId: 1,
        question: "What is the primary purpose of React hooks?",
        selectedAnswer: "To manage component lifecycle in functional components",
        correctAnswer: "To manage component lifecycle in functional components",
        isCorrect: true
      },
      {
        questionId: 2,
        question: "Which HTTP status code indicates a successful request?",
        selectedAnswer: "404",
        correctAnswer: "200",
        isCorrect: false
      }
      // Add more answers as needed
    ]
  },
  {
    id: 2,
    email: "jane.smith@company.com",
    score: 18,
    totalQuestions: 30,
    percentage: 60,
    grade: "C",
    completedAt: "2024-01-14T14:20:00Z",
    answers: []
  },
  {
    id: 3,
    email: "mike.johnson@company.com",
    score: 27,
    totalQuestions: 30,
    percentage: 90,
    grade: "A+",
    completedAt: "2024-01-13T09:15:00Z",
    answers: []
  }
];
