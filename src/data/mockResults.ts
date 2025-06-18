
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
        selectedAnswer: "A JavaScript library for building user interfaces",
        isCorrect: true
      },
      {
        questionId: 2,
        selectedAnswer: "404",
        isCorrect: false
      },
      {
        questionId: 3,
        selectedAnswer: "useState",
        isCorrect: true
      },
      {
        questionId: 4,
        selectedAnswer: "Cascading Style Sheets",
        isCorrect: true
      },
      {
        questionId: 5,
        selectedAnswer: "Document Object Model",
        isCorrect: true
      }
      // Note: Only answered first 5 questions for demo, rest will show as "Not Answered"
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
    answers: [
      {
        questionId: 1,
        selectedAnswer: "A programming language",
        isCorrect: false
      },
      {
        questionId: 2,
        selectedAnswer: "200",
        isCorrect: true
      },
      {
        questionId: 3,
        selectedAnswer: "useEffect",
        isCorrect: false
      },
      {
        questionId: 4,
        selectedAnswer: "Computer Style Sheets",
        isCorrect: false
      },
      {
        questionId: 5,
        selectedAnswer: "Document Object Model",
        isCorrect: true
      }
    ]
  },
  {
    id: 3,
    email: "mike.johnson@company.com",
    score: 27,
    totalQuestions: 30,
    percentage: 90,
    grade: "A+",
    completedAt: "2024-01-13T09:15:00Z",
    answers: [
      {
        questionId: 1,
        selectedAnswer: "A JavaScript library for building user interfaces",
        isCorrect: true
      },
      {
        questionId: 2,
        selectedAnswer: "200",
        isCorrect: true
      },
      {
        questionId: 3,
        selectedAnswer: "useState",
        isCorrect: true
      },
      {
        questionId: 4,
        selectedAnswer: "Cascading Style Sheets",
        isCorrect: true
      },
      {
        questionId: 5,
        selectedAnswer: "Document Object Model",
        isCorrect: true
      }
    ]
  }
];
