
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PDFUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedQuestions, setExtractedQuestions] = useState<any[]>([]);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setExtractedQuestions([]);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a PDF file",
        variant: "destructive"
      });
    }
  };

  const processPDF = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    
    // Simulate PDF processing - in real implementation, you'd use a PDF parsing library
    // or send to a backend service with AI/ML capabilities
    setTimeout(() => {
      const mockQuestions = [
        {
          id: Date.now() + 1,
          question: "What is React?",
          options: ["A library", "A framework", "A language", "A database"],
          correctAnswer: "A library",
          tags: ["React", "Frontend"]
        },
        {
          id: Date.now() + 2,
          question: "What does CSS stand for?",
          options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
          correctAnswer: "Cascading Style Sheets",
          tags: ["CSS", "Frontend"]
        }
      ];
      
      setExtractedQuestions(mockQuestions);
      setIsProcessing(false);
      
      toast({
        title: "PDF processed successfully",
        description: `Extracted ${mockQuestions.length} questions from the PDF`
      });
    }, 3000);
  };

  const saveQuestions = () => {
    // In a real implementation, this would save to your backend/database
    console.log("Saving questions:", extractedQuestions);
    
    toast({
      title: "Questions saved",
      description: "The extracted questions have been saved to the question bank"
    });
    
    setExtractedQuestions([]);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload size={20} />
            Upload PDF for Question Extraction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Click to upload PDF
              </p>
              <p className="text-gray-500">
                Select a PDF file containing questions and answers
              </p>
            </label>
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-600" size={20} />
                <span className="font-medium">{selectedFile.name}</span>
              </div>
              <Button 
                onClick={processPDF} 
                disabled={isProcessing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? "Processing..." : "Extract Questions"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {extractedQuestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={20} />
              Extracted Questions ({extractedQuestions.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {extractedQuestions.map((question, index) => (
              <div key={question.id} className="p-4 border rounded-lg">
                <div className="font-medium mb-2">
                  Question {index + 1}: {question.question}
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  {question.options.map((option: string, optIndex: number) => (
                    <div key={optIndex} className={`
                      ${option === question.correctAnswer ? 'text-green-600 font-medium' : ''}
                    `}>
                      {String.fromCharCode(65 + optIndex)}. {option}
                      {option === question.correctAnswer && ' ✓'}
                    </div>
                  ))}
                </div>
                <div className="flex gap-1 mt-2">
                  {question.tags.map((tag: string, tagIndex: number) => (
                    <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="flex justify-end pt-4">
              <Button onClick={saveQuestions} className="bg-green-600 hover:bg-green-700">
                Save All Questions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PDFUploader;
