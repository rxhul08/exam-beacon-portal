
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus } from "lucide-react";
import { examQuestions } from "@/data/examQuestions";
import { Question } from "@/types/exam";
import QuestionFormDialog from "./QuestionFormDialog";
import { useToast } from "@/hooks/use-toast";

const QuestionManager = () => {
  const [questions, setQuestions] = useState(examQuestions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const { toast } = useToast();

  const deleteQuestion = (id: number) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setQuestions(questions.filter(q => q.id !== id));
      toast({
        title: "Question deleted",
        description: "The question has been removed from the question bank"
      });
    }
  };

  const editQuestion = (question: Question) => {
    setEditingQuestion(question);
    setIsDialogOpen(true);
  };

  const addQuestion = () => {
    setEditingQuestion(null);
    setIsDialogOpen(true);
  };

  const handleSaveQuestion = (question: Question) => {
    if (editingQuestion) {
      // Update existing question
      setQuestions(questions.map(q => q.id === question.id ? question : q));
      toast({
        title: "Question updated",
        description: "The question has been successfully updated"
      });
    } else {
      // Add new question
      setQuestions([...questions, question]);
      toast({
        title: "Question added",
        description: "The new question has been added to the question bank"
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingQuestion(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Question Bank Management</h2>
        <Button onClick={addQuestion} className="bg-blue-600 hover:bg-blue-700">
          <Plus size={16} className="mr-2" />
          Add Question
        </Button>
      </div>

      <div className="grid gap-4">
        {questions.map((question) => (
          <Card key={question.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Question {question.id}</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => editQuestion(question)}>
                    <Edit size={14} />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => deleteQuestion(question.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="font-medium">{question.question}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {question.options.map((option, index) => (
                    <div key={index} className={`p-2 rounded text-sm ${
                      option === question.correctAnswer 
                        ? 'bg-green-50 border border-green-200 text-green-800' 
                        : 'bg-gray-50'
                    }`}>
                      {String.fromCharCode(65 + index)}. {option}
                      {option === question.correctAnswer && ' ✓'}
                    </div>
                  ))}
                </div>

                <div className="flex gap-1">
                  {question.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <QuestionFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveQuestion}
        question={editingQuestion}
      />
    </div>
  );
};

export default QuestionManager;
