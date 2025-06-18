
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Mail } from "lucide-react";
import { mockCandidateResults } from "@/data/mockResults";

const CandidateResults = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

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

  const sendEmail = (candidate: any) => {
    console.log("Sending email to:", candidate.email);
    // Implement email sending logic here
  };

  return (
    <div className="space-y-6">
      {!selectedCandidate ? (
        <Card>
          <CardHeader>
            <CardTitle>Candidate Results Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate Email</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Completed At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCandidateResults.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-medium">{candidate.email}</TableCell>
                    <TableCell>{candidate.score}/{candidate.totalQuestions}</TableCell>
                    <TableCell>
                      <Badge className={getScoreColor(candidate.percentage)}>
                        {candidate.percentage}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getScoreColor(candidate.percentage)}>
                        {candidate.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(candidate.completedAt).toLocaleDateString()}</TableCell>
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
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendEmail(candidate)}
                        >
                          <Mail size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Detailed Results for {selectedCandidate.email}</h2>
            <Button variant="outline" onClick={() => setSelectedCandidate(null)}>
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
              <CardTitle>Question-wise Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedCandidate.answers.map((answer: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">Question {answer.questionId}</div>
                      <Badge className={answer.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {answer.isCorrect ? "Correct" : "Incorrect"}
                      </Badge>
                    </div>
                    <div className="text-gray-700 mb-2">{answer.question}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Selected: </span>
                        <span className={answer.isCorrect ? "text-green-600" : "text-red-600"}>
                          {answer.selectedAnswer}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Correct: </span>
                        <span className="text-green-600">{answer.correctAnswer}</span>
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
