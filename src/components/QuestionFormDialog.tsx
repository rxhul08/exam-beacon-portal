
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Question } from "@/types/exam";

interface QuestionFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: Question) => void;
  question?: Question | null;
}

const QuestionFormDialog = ({ isOpen, onClose, onSave, question }: QuestionFormDialogProps) => {
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    tags: [] as string[],
    newTag: ""
  });

  useEffect(() => {
    if (question) {
      setFormData({
        question: question.question,
        options: [...question.options],
        correctAnswer: question.correctAnswer,
        tags: [...question.tags],
        newTag: ""
      });
    } else {
      setFormData({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        tags: [],
        newTag: ""
      });
    }
  }, [question, isOpen]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.newTag.trim()],
        newTag: ""
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question.trim()) {
      alert("Please enter a question");
      return;
    }

    if (formData.options.some(option => !option.trim())) {
      alert("Please fill in all options");
      return;
    }

    if (!formData.correctAnswer.trim()) {
      alert("Please select a correct answer");
      return;
    }

    if (!formData.options.includes(formData.correctAnswer)) {
      alert("Correct answer must be one of the options");
      return;
    }

    const newQuestion: Question = {
      id: question?.id || Date.now(),
      question: formData.question.trim(),
      options: formData.options.map(opt => opt.trim()),
      correctAnswer: formData.correctAnswer,
      tags: formData.tags.length > 0 ? formData.tags : ["General"]
    };

    onSave(newQuestion);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {question ? "Edit Question" : "Add New Question"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="Enter your question here..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <Label>Options</Label>
            {formData.options.map((option, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`option-${index}`}>
                  Option {String.fromCharCode(65 + index)}
                </Label>
                <Input
                  id={`option-${index}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="correctAnswer">Correct Answer</Label>
            <select
              id="correctAnswer"
              value={formData.correctAnswer}
              onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select correct answer</option>
              {formData.options.map((option, index) => (
                <option key={index} value={option} disabled={!option.trim()}>
                  {String.fromCharCode(65 + index)}. {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={formData.newTag}
                onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {question ? "Update Question" : "Add Question"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionFormDialog;
