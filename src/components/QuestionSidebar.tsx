
import { Question, Answer } from "@/types/exam";
import { cn } from "@/lib/utils";

interface QuestionSidebarProps {
  questions: Question[];
  currentQuestion: number;
  answers: Record<number, Answer>;
  onQuestionSelect: (questionNumber: number) => void;
}

const QuestionSidebar = ({
  questions,
  currentQuestion,
  answers,
  onQuestionSelect
}: QuestionSidebarProps) => {
  const getQuestionStatus = (questionId: number) => {
    if (answers[questionId]) {
      return "answered";
    }
    return "unanswered";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border h-full overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
        <p className="text-sm text-gray-600 mt-1">
          {Object.keys(answers).length} of {questions.length} answered
        </p>
      </div>
      
      <div className="p-4 overflow-y-auto h-full">
        <div className="grid grid-cols-5 gap-2">
          {questions.map((question) => {
            const status = getQuestionStatus(question.id);
            const isActive = currentQuestion === question.id;
            
            return (
              <button
                key={question.id}
                onClick={() => onQuestionSelect(question.id)}
                className={cn(
                  "w-10 h-10 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105",
                  isActive && "ring-2 ring-blue-500 ring-offset-2",
                  status === "answered" 
                    ? "bg-green-500 text-white hover:bg-green-600" 
                    : "bg-red-500 text-white hover:bg-red-600"
                )}
              >
                {question.id}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-600">Unanswered</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-600">Answered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSidebar;
