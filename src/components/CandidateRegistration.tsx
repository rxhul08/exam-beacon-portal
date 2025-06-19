
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building2, BookOpen } from "lucide-react";

interface CandidateInfo {
  email: string;
  department: string;
}

interface CandidateRegistrationProps {
  onRegistrationComplete: (candidateInfo: CandidateInfo) => void;
}

const CandidateRegistration = ({ onRegistrationComplete }: CandidateRegistrationProps) => {
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [errors, setErrors] = useState<{ email?: string; department?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; department?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!department.trim()) {
      newErrors.department = "Department is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitting candidate info:", { email: email.trim(), department: department.trim() });
      onRegistrationComplete({ email: email.trim(), department: department.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center pb-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="mx-auto w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">PowerBI Examination Portal</CardTitle>
          <p className="text-blue-100 mt-2">Please enter your details to begin your assessment</p>
        </CardHeader>
        <CardContent className="pt-6 px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Work Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-12 border-2 transition-all duration-200 ${
                  errors.email 
                    ? "border-red-400 focus:border-red-500 bg-red-50" 
                    : "border-gray-200 focus:border-blue-500 focus:bg-blue-50"
                }`}
              />
              {errors.email && (
                <p className="text-sm font-medium text-red-600 flex items-center gap-1 bg-red-50 p-2 rounded">
                  ⚠️ {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="department" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Department
              </label>
              <Input
                id="department"
                type="text"
                placeholder="e.g., Engineering, Marketing, Sales"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={`h-12 border-2 transition-all duration-200 ${
                  errors.department 
                    ? "border-red-400 focus:border-red-500 bg-red-50" 
                    : "border-gray-200 focus:border-blue-500 focus:bg-blue-50"
                }`}
              />
              {errors.department && (
                <p className="text-sm font-medium text-red-600 flex items-center gap-1 bg-red-50 p-2 rounded">
                  ⚠️ {errors.department}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Examination
            </Button>
          </form>
          
          <div className="mt-6 text-center space-y-2">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-700 font-medium flex items-center justify-center gap-2">
                📋 Complete the exam in one session
              </p>
              <p className="text-sm text-blue-600 mt-1 flex items-center justify-center gap-2">
                ⏰ Time limit: 30 minutes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateRegistration;
