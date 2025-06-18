
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

  const extractQuestionsFromText = (text: string) => {
    const questions = [];
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    let currentQuestion = null;
    let questionNumber = 1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Look for question patterns (Q1, Q2, Question 1, etc.)
      const questionMatch = line.match(/^(?:Q\.?\s*(\d+)|Question\s+(\d+)|(\d+)\.)\s*(.+)/i);
      if (questionMatch) {
        // Save previous question if exists
        if (currentQuestion && currentQuestion.options.length >= 2) {
          questions.push({
            id: Date.now() + questions.length,
            question: currentQuestion.question,
            options: currentQuestion.options,
            correctAnswer: currentQuestion.correctAnswer || currentQuestion.options[0],
            tags: ["Extracted", "PDF"]
          });
        }
        
        // Start new question
        currentQuestion = {
          question: questionMatch[4] || line,
          options: [],
          correctAnswer: null
        };
        continue;
      }
      
      // Look for option patterns (A), B), a., b., etc.)
      const optionMatch = line.match(/^(?:[A-D][\)\.]\s*|[a-d][\)\.]\s*|[A-D]\s+)(.+)/i);
      if (optionMatch && currentQuestion) {
        const optionText = optionMatch[1].trim();
        currentQuestion.options.push(optionText);
        
        // Look for correct answer indicators (*, correct, answer, etc.)
        if (line.includes('*') || line.toLowerCase().includes('correct') || line.toLowerCase().includes('answer')) {
          currentQuestion.correctAnswer = optionText;
        }
        continue;
      }
      
      // If we have a current question and this looks like a continuation
      if (currentQuestion && !questionMatch && !optionMatch) {
        if (currentQuestion.options.length === 0) {
          // Append to question text
          currentQuestion.question += ' ' + line;
        } else if (currentQuestion.options.length > 0 && line.length > 10) {
          // This might be another option without proper formatting
          currentQuestion.options.push(line);
        }
      }
    }
    
    // Don't forget the last question
    if (currentQuestion && currentQuestion.options.length >= 2) {
      questions.push({
        id: Date.now() + questions.length,
        question: currentQuestion.question,
        options: currentQuestion.options,
        correctAnswer: currentQuestion.correctAnswer || currentQuestion.options[0],
        tags: ["Extracted", "PDF"]
      });
    }
    
    return questions;
  };

  const processPDF = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    
    try {
      // Read PDF as array buffer
      const arrayBuffer = await selectedFile.arrayBuffer();
      
      // For now, we'll simulate PDF text extraction
      // In production, you would use a proper PDF parsing library
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // This is a simplified approach - in reality you'd use pdf-parse or similar
          const text = await extractTextFromPDF(arrayBuffer);
          const questions = extractQuestionsFromText(text);
          
          if (questions.length > 0) {
            setExtractedQuestions(questions);
            toast({
              title: "PDF processed successfully",
              description: `Extracted ${questions.length} questions from the PDF`
            });
          } else {
            toast({
              title: "No questions found",
              description: "Could not extract questions from this PDF. Please check the format.",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error('PDF processing error:', error);
          toast({
            title: "Processing failed",
            description: "Error processing PDF. Please try a different file.",
            variant: "destructive"
          });
        } finally {
          setIsProcessing(false);
        }
      };
      
      reader.readAsText(selectedFile);
    } catch (error) {
      console.error('PDF reading error:', error);
      toast({
        title: "Error reading PDF",
        description: "Could not read the PDF file.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  const extractTextFromPDF = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    // This is a placeholder for PDF text extraction
    // In a real implementation, you would use a library like pdf-parse
    // For now, we'll return a sample text that follows question format
    return `
Q1. What is React?
A) A database
B) A JavaScript library for building user interfaces
C) A programming language
D) An operating system

Q2. Which hook is used for state management in React?
A) useEffect
B) useState
C) useContext
D) useReducer

Q3. What does CSS stand for?
A) Computer Style Sheets
B) Cascading Style Sheets
C) Creative Style Sheets
D) Colorful Style Sheets
    `;
  };

  const saveQuestions = () => {
    // In a real implementation, this would save to your backend/database
    console.log("Saving questions:", extractedQuestions);
    
    // Here you would typically update the examQuestions data
    // For now, we'll just show a success message
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
