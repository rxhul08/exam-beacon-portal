
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, RefreshCw } from "lucide-react";
import { examQuestions } from "@/data/examQuestions";

const CandidateResults = () => {
  const [results, setResults] = useState<any[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  // Load results from localStorage
  const loadResults = () => {
    const savedResults = JSON.parse(localStorage.getItem('examResults') || '[]');
    console.log("Loading results from localStorage:", savedResults);
    setResults(savedResults);
  };

  useEffect(() => {
    loadResults();
  }, []);

  // Refresh results manually
  const refreshResults = () => {
    loadResults();
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-800";
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const viewDetails = (candidate: any) => {
    setSelectedCandidate(candidate);
  };

  const downloadReport = (candidate: any) => {
    console.log("Downloading report for:", candidate.email);
    // Implement PDF generation logic here
  };

  const clearAllResults = () => {
    localStorage.removeItem('examResults');
    setResults([]);
    setSelectedCandidate(null);
  };

  // Generate complete question analysis for the selected candidate
  const generateQuestionAnalysis = (candidate: any) => {
    return examQuestions.map((question) => {
      // Find if this question was answered by the candidate
      const candidateAnswer = candidate.answers?.find((answer: any) => answer.questionId === question.id);
      
      return {
        questionId: question.id,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        selectedAnswer: candidateAnswer?.selectedAnswer || "Not Answered",
        isCorrect: candidateAnswer ? candidateAnswer.selectedAnswer === question.correctAnswer : false,
        wasAnswered: !!candidateAnswer
      };
    });
  };

  return (
    <div className="space-y-6">
      {!selectedCandidate ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Candidate Results Overview</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Total Results: {results.length}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={refreshResults} className="flex items-center gap-2">
                  <RefreshCw size={16} />
                  Refresh
                </Button>
                {results.length > 0 && (
                  <Button variant="outline" onClick={clearAllResults} className="text-red-600">
                    Clear All Results
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No exam results available yet.</p>
                <p className="text-sm text-gray-400 mt-2">Results will appear here after candidates complete their exams.</p>
                <Button onClick={refreshResults} className="mt-4">
                  Check for New Results
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  Debug Info: Found {results.length} result(s) in localStorage
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Completed At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((candidate, index) => (
                      <TableRow key={candidate.id || index}>
                        <TableCell className="font-medium">
                          {candidate.email || 'N/A'}
                        </TableCell>
                        <TableCell>{candidate.department || 'N/A'}</TableCell>
                        <TableCell>{candidate.score || 0}/{candidate.totalQuestions || 0}</TableCell>
                        <TableCell>
                          <Badge className={getScoreColor(candidate.percentage || 0)}>
                            {candidate.percentage || 0}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getScoreColor(candidate.percentage || 0)}>
                            {candidate.grade || 'F'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {candidate.completedAt ? new Date(candidate.completedAt).toLocaleDateString() : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => viewDetails(candidate)}
                            >
                              <Eye size={14} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadReport(candidate)}
                            >
                              <Download size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Detailed Results for {selectedCandidate.email}</h2>
              <p className="text-gray-600">Department: {selectedCandidate.department}</p>
            </div>
            <Button variant="outline" onClick={() => {
              setSelectedCandidate(null);
              refreshResults();
            }}>
              Back to Overview
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{selectedCandidate.score}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{selectedCandidate.totalQuestions - selectedCandidate.score}</div>
                <div className="text-sm text-gray-600">Incorrect Answers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${selectedCandidate.percentage >= 60 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedCandidate.percentage}%
                </div>
                <div className="text-sm text-gray-600">Percentage</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${selectedCandidate.percentage >= 60 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedCandidate.grade}
                </div>
                <div className="text-sm text-gray-600">Grade</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Complete Question Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generateQuestionAnalysis(selectedCandidate).map((analysis, index) => (
                  <div key={analysis.questionId} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">Question {analysis.questionId}</div>
                      <Badge className={
                        !analysis.wasAnswered 
                          ? "bg-gray-100 text-gray-800" 
                          : analysis.isCorrect 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                      }>
                        {!analysis.wasAnswered ? "Not Answered" : analysis.isCorrect ? "Correct" : "Incorrect"}
                      </Badge>
                    </div>
                    <div className="text-gray-700 mb-3">{analysis.question}</div>
                    
                    <div className="space-y-2 mb-3">
                      {analysis.options.map((option, optIndex) => (
                        <div 
                          key={optIndex} 
                          className={`p-2 rounded text-sm ${
                            option === analysis.correctAnswer 
                              ? 'bg-green-50 border border-green-200 text-green-800' 
                              : option === analysis.selectedAnswer && analysis.selectedAnswer !== analysis.correctAnswer
                                ? 'bg-red-50 border border-red-200 text-red-800'
                                : 'bg-gray-50'
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                          {option === analysis.correctAnswer && ' ✓ (Correct Answer)'}
                          {option === analysis.selectedAnswer && analysis.selectedAnswer !== analysis.correctAnswer && ' ✗ (Selected)'}
                          {option === analysis.selectedAnswer && analysis.selectedAnswer === analysis.correctAnswer && ' ✓ (Selected - Correct)'}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Selected Answer: </span>
                        <span className={
                          !analysis.wasAnswered 
                            ? "text-gray-600" 
                            : analysis.isCorrect 
                              ? "text-green-600" 
                              : "text-red-600"
                        }>
                          {analysis.selectedAnswer}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Correct Answer: </span>
                        <span className="text-green-600">{analysis.correctAnswer}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CandidateResults;
