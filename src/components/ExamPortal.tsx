
import { useState, useEffect } from "react";
import QuestionSidebar from "./QuestionSidebar";
import QuestionDisplay from "./QuestionDisplay";
import Timer from "./Timer";
import ScoreDisplay from "./ScoreDisplay";
import TabSwitchGuard from "./TabSwitchGuard";
import CandidateRegistration from "./CandidateRegistration";
import { examQuestions } from "@/data/examQuestions";
import { Question, Answer } from "@/types/exam";

interface CandidateInfo {
  email: string;
  department: string;
}

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const ExamPortal = () => {
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [timeLeft, setTimeLeft] = useState<number>(30 * 60); // 30 minutes in seconds
  const [examCompleted, setExamCompleted] = useState<boolean>(false);

  // Shuffle questions when candidate info is set
  useEffect(() => {
    if (candidateInfo && shuffledQuestions.length === 0) {
      const shuffled = shuffleArray(examQuestions);
      // Re-assign IDs to maintain order for navigation
      const reIndexedQuestions = shuffled.map((question, index) => ({
        ...question,
        id: index + 1,
        originalId: question.id // Keep original ID for reference
      }));
      setShuffledQuestions(reIndexedQuestions);
      console.log("Questions shuffled for candidate:", candidateInfo.email);
    }
  }, [candidateInfo, shuffledQuestions.length]);

  // Handle candidate registration
  const handleRegistrationComplete = (info: CandidateInfo) => {
    console.log("Candidate registration completed:", info);
    setCandidateInfo(info);
  };

  // Handle answer selection
  const handleAnswerSelect = (questionNumber: number, selectedOption: string) => {
    const question = shuffledQuestions.find(q => q.id === questionNumber);
    if (!question) return;

    const newAnswer: Answer = {
      questionId: questionNumber,
      selectedOption,
      isCorrect: selectedOption === question.correctAnswer,
      timestamp: new Date()
    };

    setAnswers(prev => ({
      ...prev,
      [questionNumber]: newAnswer
    }));
  };

  // Handle exam completion
  const handleExamComplete = () => {
    setExamCompleted(true);
    
    // Calculate score
    const score = Object.values(answers).filter(answer => answer.isCorrect).length;
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    
    // Store results in localStorage for admin to view
    const existingResults = JSON.parse(localStorage.getItem('examResults') || '[]');
    const newResult = {
      id: Date.now(),
      email: candidateInfo?.email || 'unknown@company.com',
      department: candidateInfo?.department || 'Unknown',
      score,
      totalQuestions: shuffledQuestions.length,
      percentage,
      grade: percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : percentage >= 50 ? 'D' : 'F',
      completedAt: new Date().toISOString(),
      answers: Object.values(answers).map(answer => ({
        questionId: answer.questionId,
        selectedAnswer: answer.selectedOption,
        isCorrect: answer.isCorrect
      }))
    };
    
    existingResults.push(newResult);
    localStorage.setItem('examResults', JSON.stringify(existingResults));
    
    console.log("Exam completed. Results saved to localStorage:", newResult);
    console.log("Total results in localStorage:", existingResults.length);
  };

  // Handle tab switch violation
  const handleTabSwitchViolation = () => {
    console.log("Tab switch violation - completing exam");
    handleExamComplete();
  };

  // Timer effect
  useEffect(() => {
    if (!candidateInfo || timeLeft <= 0 || examCompleted) {
      if (!examCompleted && candidateInfo && timeLeft <= 0) {
        console.log("Time up - completing exam");
        handleExamComplete();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, examCompleted, candidateInfo]);

  // Show registration form first
  if (!candidateInfo) {
    return <CandidateRegistration onRegistrationComplete={handleRegistrationComplete} />;
  }

  if (examCompleted) {
    return <ScoreDisplay answers={answers} questions={shuffledQuestions} />;
  }

  // Wait for questions to be shuffled
  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing your examination...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Tab Switch Guard */}
      <TabSwitchGuard 
        isActive={!examCompleted} 
        onViolation={handleTabSwitchViolation}
      />
      
      {/* Header with Timer */}
      <div className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Internal Examination Portal
            </h1>
            <p className="text-sm text-gray-600">
              Candidate: <span className="font-medium text-blue-600">{candidateInfo.email}</span> | 
              Department: <span className="font-medium text-blue-600">{candidateInfo.department}</span>
            </p>
          </div>
          <Timer timeLeft={timeLeft} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Question Sidebar */}
          <div className="lg:col-span-1">
            <QuestionSidebar
              questions={shuffledQuestions}
              currentQuestion={currentQuestion}
              answers={answers}
              onQuestionSelect={setCurrentQuestion}
            />
          </div>

          {/* Question Display */}
          <div className="lg:col-span-3">
            <QuestionDisplay
              question={shuffledQuestions.find(q => q.id === currentQuestion)}
              selectedAnswer={answers[currentQuestion]?.selectedOption}
              onAnswerSelect={(option) => handleAnswerSelect(currentQuestion, option)}
              onNext={() => {
                if (currentQuestion < shuffledQuestions.length) {
                  setCurrentQuestion(currentQuestion + 1);
                }
              }}
              onPrevious={() => {
                if (currentQuestion > 1) {
                  setCurrentQuestion(currentQuestion - 1);
                }
              }}
              onSubmit={handleExamComplete}
              isLastQuestion={currentQuestion === shuffledQuestions.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPortal;
