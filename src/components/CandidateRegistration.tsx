
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building2 } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Welcome to Examination Portal</CardTitle>
          <p className="text-gray-600 mt-2">Please enter your details to begin</p>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Work Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-12 ${errors.email ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"}`}
              />
              {errors.email && (
                <p className="text-sm font-medium text-red-600 flex items-center gap-1">
                  ⚠️ {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="department" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Department
              </label>
              <Input
                id="department"
                type="text"
                placeholder="e.g., Engineering, Marketing, Sales"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={`h-12 ${errors.department ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"}`}
              />
              {errors.department && (
                <p className="text-sm font-medium text-red-600 flex items-center gap-1">
                  ⚠️ {errors.department}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors">
              Start Examination
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              📋 Make sure to complete the exam in one session
            </p>
            <p className="text-xs text-gray-500 mt-1">
              ⏰ Time limit: 30 minutes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateRegistration;
