
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Users, BarChart3 } from "lucide-react";
import PDFUploader from "./PDFUploader";
import CandidateResults from "./CandidateResults";
import QuestionManager from "./QuestionManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("questions");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage examinations and view candidate results</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <FileText size={16} />
              Question Management
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Candidate Results
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload size={16} />
              PDF Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions">
            <QuestionManager />
          </TabsContent>

          <TabsContent value="results">
            <CandidateResults />
          </TabsContent>

          <TabsContent value="upload">
            <PDFUploader />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
