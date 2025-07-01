import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, RefreshCw, Filter, Users, UserCheck } from "lucide-react";
import { examQuestions } from "@/data/examQuestions";

const CandidateResults = () => {
  const [results, setResults] = useState<any[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [filter, setFilter] = useState<string>("all");
  const PASSING_SCORE = 23;

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

  const clearAllResults = () => {
    localStorage.removeItem('examResults');
    setResults([]);
    setSelectedCandidate(null);
  };

  // Filter candidates based on pass/fail status
  const getFilteredResults = (filterType: string) => {
    if (filterType === "passed") {
      return results.filter(candidate => (candidate.score || 0) >= PASSING_SCORE);
    } else if (filterType === "failed") {
      return results.filter(candidate => (candidate.score || 0) < PASSING_SCORE);
    }
    return results;
  };

  const passedCandidates = results.filter(candidate => (candidate.score || 0) >= PASSING_SCORE);
  const failedCandidates = results.filter(candidate => (candidate.score || 0) < PASSING_SCORE);

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

  const renderResultsTable = (candidates: any[], showPassFailBadge = false) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Candidate Email</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Percentage</TableHead>
          <TableHead>Grade</TableHead>
          {showPassFailBadge && <TableHead>Status</TableHead>}
          <TableHead>Completed At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidates.map((candidate, index) => (
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
            {showPassFailBadge && (
              <TableCell>
                <Badge className={(candidate.score || 0) >= PASSING_SCORE ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {(candidate.score || 0) >= PASSING_SCORE ? "PASSED" : "FAILED"}
                </Badge>
              </TableCell>
            )}
            <TableCell>
              {candidate.completedAt ? new Date(candidate.completedAt).toLocaleDateString() : 'N/A'}
            </TableCell>
            <TableCell>
              <Button
                size="sm"
                variant="outline"
                onClick={() => viewDetails(candidate)}
              >
                <Eye size={14} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      {!selectedCandidate ? (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users size={16} />
              All Candidates
            </TabsTrigger>
            <TabsTrigger value="passed" className="flex items-center gap-2">
              <UserCheck size={16} />
              Passed Candidates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users size={20} />
                      All Candidate Results
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Total Results: {results.length} | Passed: {passedCandidates.length} | Failed: {failedCandidates.length}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex items-center gap-2">
                      <Filter size={16} />
                      <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="passed">Passed</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                      Showing {getFilteredResults(filter).length} of {results.length} results (Passing Score: {PASSING_SCORE}/30)
                    </div>
                    {renderResultsTable(getFilteredResults(filter), true)}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="passed">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck size={20} className="text-green-600" />
                      Passed Candidates
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Candidates who scored {PASSING_SCORE}/30 or above: {passedCandidates.length}
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
                {passedCandidates.length === 0 ? (
                  <div className="text-center py-8">
                    <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No candidates have passed yet.</p>
                    <p className="text-sm text-gray-400 mt-2">Candidates need to score at least {PASSING_SCORE}/30 to pass.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                      <div className="text-green-800 font-medium">
                        🎉 {passedCandidates.length} candidates have successfully passed the exam!
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Pass Rate: {Math.round((passedCandidates.length / results.length) * 100)}%
                      </Badge>
                    </div>
                    {renderResultsTable(passedCandidates)}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
