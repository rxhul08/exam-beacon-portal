
import { Question } from "@/types/exam";

export const examQuestions: Question[] = [
  {
    id: 1,
    question: "What is the primary purpose of React hooks?",
    options: [
      "To manage component lifecycle in functional components",
      "To replace class components entirely",
      "To handle HTTP requests",
      "To manage database connections"
    ],
    correctAnswer: "To manage component lifecycle in functional components",
    tags: ["React", "Frontend"]
  },
  {
    id: 2,
    question: "Which HTTP status code indicates a successful request?",
    options: ["200", "404", "500", "301"],
    correctAnswer: "200",
    tags: ["HTTP", "Backend"]
  },
  {
    id: 3,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets", 
      "Creative Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: "Cascading Style Sheets",
    tags: ["CSS", "Frontend"]
  },
  {
    id: 4,
    question: "Which JavaScript method is used to add an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()",
    tags: ["JavaScript", "Programming"]
  },
  {
    id: 5,
    question: "What is the purpose of the 'key' prop in React lists?",
    options: [
      "To encrypt data",
      "To help React identify which items have changed",
      "To sort the list",
      "To style the elements"
    ],
    correctAnswer: "To help React identify which items have changed",
    tags: ["React", "Performance"]
  },
  {
    id: 6,
    question: "Which SQL command is used to retrieve data from a database?",
    options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
    correctAnswer: "SELECT",
    tags: ["SQL", "Database"]
  },
  {
    id: 7,
    question: "What is the box model in CSS?",
    options: [
      "A way to create boxes",
      "The space around content including padding, border, and margin",
      "A debugging tool",
      "A layout technique"
    ],
    correctAnswer: "The space around content including padding, border, and margin",
    tags: ["CSS", "Layout"]
  },
  {
    id: 8,
    question: "Which Git command is used to create a new branch?",
    options: ["git branch", "git checkout", "git merge", "git commit"],
    correctAnswer: "git branch",
    tags: ["Git", "Version Control"]
  },
  {
    id: 9,
    question: "What is the purpose of TypeScript?",
    options: [
      "To replace JavaScript",
      "To add static typing to JavaScript",
      "To compile JavaScript",
      "To debug JavaScript"
    ],
    correctAnswer: "To add static typing to JavaScript",
    tags: ["TypeScript", "Programming"]
  },
  {
    id: 10,
    question: "Which HTTP method is typically used to update existing data?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctAnswer: "PUT",
    tags: ["HTTP", "API"]
  },
  {
    id: 11,
    question: "What is the virtual DOM in React?",
    options: [
      "A real DOM element",
      "A JavaScript representation of the real DOM",
      "A browser API",
      "A CSS technique"
    ],
    correctAnswer: "A JavaScript representation of the real DOM",
    tags: ["React", "Performance"]
  },
  {
    id: 12,
    question: "Which CSS property is used to make elements flexible?",
    options: ["display: block", "display: flex", "display: inline", "display: grid"],
    correctAnswer: "display: flex",
    tags: ["CSS", "Flexbox"]
  },
  {
    id: 13,
    question: "What is the purpose of the useState hook in React?",
    options: [
      "To manage component state",
      "To handle side effects",
      "To optimize performance",
      "To handle events"
    ],
    correctAnswer: "To manage component state",
    tags: ["React", "Hooks"]
  },
  {
    id: 14,
    question: "Which JavaScript operator is used for strict equality comparison?",
    options: ["==", "===", "=", "!="],
    correctAnswer: "===",
    tags: ["JavaScript", "Operators"]
  },
  {
    id: 15,
    question: "What is the purpose of CORS?",
    options: [
      "To compress data",
      "To allow cross-origin requests",
      "To encrypt data",
      "To cache responses"
    ],
    correctAnswer: "To allow cross-origin requests",
    tags: ["Security", "Web"]
  },
  {
    id: 16,
    question: "Which HTML element is used for the largest heading?",
    options: ["<h6>", "<h1>", "<header>", "<title>"],
    correctAnswer: "<h1>",
    tags: ["HTML", "Semantic"]
  },
  {
    id: 17,
    question: "What is npm?",
    options: [
      "A code editor",
      "A package manager for Node.js",
      "A database",
      "A web server"
    ],
    correctAnswer: "A package manager for Node.js",
    tags: ["Node.js", "Tools"]
  },
  {
    id: 18,
    question: "Which CSS property controls the spacing between lines of text?",
    options: ["letter-spacing", "word-spacing", "line-height", "text-spacing"],
    correctAnswer: "line-height",
    tags: ["CSS", "Typography"]
  },
  {
    id: 19,
    question: "What is the purpose of the useEffect hook?",
    options: [
      "To manage state",
      "To handle side effects",
      "To create components",
      "To style components"
    ],
    correctAnswer: "To handle side effects",
    tags: ["React", "Hooks"]
  },
  {
    id: 20,
    question: "Which protocol is commonly used for secure web communication?",
    options: ["HTTP", "HTTPS", "FTP", "SMTP"],
    correctAnswer: "HTTPS",
    tags: ["Security", "Protocols"]
  },
  {
    id: 21,
    question: "What is the purpose of a foreign key in a database?",
    options: [
      "To encrypt data",
      "To establish relationships between tables",
      "To index data",
      "To backup data"
    ],
    correctAnswer: "To establish relationships between tables",
    tags: ["Database", "SQL"]
  },
  {
    id: 22,
    question: "Which JavaScript method is used to convert a string to lowercase?",
    options: ["toLowerCase()", "lower()", "downCase()", "convertLower()"],
    correctAnswer: "toLowerCase()",
    tags: ["JavaScript", "String Methods"]
  },
  {
    id: 23,
    question: "What is the purpose of media queries in CSS?",
    options: [
      "To query databases",
      "To create responsive designs",
      "To handle animations",
      "To manage fonts"
    ],
    correctAnswer: "To create responsive designs",
    tags: ["CSS", "Responsive"]
  },
  {
    id: 24,
    question: "Which Git command is used to stage changes?",
    options: ["git commit", "git add", "git push", "git pull"],
    correctAnswer: "git add",
    tags: ["Git", "Version Control"]
  },
  {
    id: 25,
    question: "What is the difference between let and var in JavaScript?",
    options: [
      "No difference",
      "let has block scope, var has function scope",
      "var is newer",
      "let is for numbers only"
    ],
    correctAnswer: "let has block scope, var has function scope",
    tags: ["JavaScript", "Variables"]
  },
  {
    id: 26,
    question: "Which HTTP header is used to specify the content type?",
    options: ["Content-Length", "Content-Type", "Accept", "Authorization"],
    correctAnswer: "Content-Type",
    tags: ["HTTP", "Headers"]
  },
  {
    id: 27,
    question: "What is the purpose of the render method in React class components?",
    options: [
      "To handle events",
      "To return JSX to be rendered",
      "To manage state",
      "To make API calls"
    ],
    correctAnswer: "To return JSX to be rendered",
    tags: ["React", "Class Components"]
  },
  {
    id: 28,
    question: "Which CSS unit is relative to the font size of the element?",
    options: ["px", "em", "vh", "pt"],
    correctAnswer: "em",
    tags: ["CSS", "Units"]
  },
  {
    id: 29,
    question: "What is the purpose of async/await in JavaScript?",
    options: [
      "To create loops",
      "To handle asynchronous operations",
      "To define functions",
      "To create objects"
    ],
    correctAnswer: "To handle asynchronous operations",
    tags: ["JavaScript", "Async"]
  },
  {
    id: 30,
    question: "Which command is used to initialize a new Git repository?",
    options: ["git start", "git init", "git create", "git new"],
    correctAnswer: "git init",
    tags: ["Git", "Initialization"]
  }
];
