
import { Question } from "@/types/exam";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuestionDisplayProps {
  question?: Question;
  selectedAnswer?: string;
  onAnswerSelect: (option: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isLastQuestion: boolean;
}

const QuestionDisplay = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  onSubmit,
  isLastQuestion
}: QuestionDisplayProps) => {
  if (!question) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-gray-500">Please select a question from the sidebar</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">
            Question {question.id}
          </CardTitle>
          <div className="flex gap-1">
            {question.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="mb-6">
          <p className="text-lg text-gray-900 leading-relaxed">
            {question.question}
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
            const isSelected = selectedAnswer === option;
            
            return (
              <button
                key={index}
                onClick={() => onAnswerSelect(option)}
                className={cn(
                  "w-full p-4 text-left border rounded-lg transition-all duration-200 hover:shadow-md",
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium",
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    )}
                  >
                    {optionLetter}
                  </span>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-auto flex justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={question.id === 1}
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            {isLastQuestion ? (
              <Button
                onClick={onSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Exam
              </Button>
            ) : (
              <Button onClick={onNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionDisplay;
