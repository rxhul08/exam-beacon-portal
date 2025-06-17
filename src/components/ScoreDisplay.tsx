
import { Question, Answer } from "@/types/exam";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Award } from "lucide-react";

interface ScoreDisplayProps {
  answers: Record<number, Answer>;
  questions: Question[];
}

const ScoreDisplay = ({ answers, questions }: ScoreDisplayProps) => {
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const correctAnswers = Object.values(answers).filter(answer => answer.isCorrect).length;
  const incorrectAnswers = answeredQuestions - correctAnswers;
  const unansweredQuestions = totalQuestions - answeredQuestions;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: "A+", color: "text-green-600" };
    if (percentage >= 80) return { grade: "A", color: "text-green-600" };
    if (percentage >= 70) return { grade: "B", color: "text-blue-600" };
    if (percentage >= 60) return { grade: "C", color: "text-yellow-600" };
    return { grade: "F", color: "text-red-600" };
  };

  const { grade, color } = getGrade(percentage);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <Award className="w-16 h-16 text-yellow-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Exam Completed!
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Here are your results
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Overall Score */}
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className={`text-4xl font-bold ${color} mb-2`}>
              {percentage}%
            </div>
            <div className={`text-2xl font-semibold ${color} mb-2`}>
              Grade: {grade}
            </div>
            <div className="text-gray-600">
              {correctAnswers} out of {totalQuestions} questions correct
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">
                {incorrectAnswers}
              </div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-400 rounded-full mx-auto mb-2"></div>
              <div className="text-2xl font-bold text-gray-600">
                {unansweredQuestions}
              </div>
              <div className="text-sm text-gray-600">Unanswered</div>
            </div>
          </div>

          {/* Performance Message */}
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 font-medium">
              {percentage >= 80 
                ? "Excellent work! You've demonstrated strong understanding." 
                : percentage >= 60 
                ? "Good job! There's room for improvement in some areas." 
                : "Keep studying! Consider reviewing the material and trying again."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-6">
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Retake Exam
            </Button>
            <Button onClick={() => window.print()}>
              Print Results
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreDisplay;
