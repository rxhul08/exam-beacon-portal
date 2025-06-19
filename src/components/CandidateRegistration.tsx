
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      onRegistrationComplete({ email: email.trim(), department: department.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Internal Examination Portal</CardTitle>
          <p className="text-gray-600 text-center">Please provide your details to begin the examination</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Work Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm font-medium text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <Input
                id="department"
                type="text"
                placeholder="e.g., Engineering, Marketing, Sales"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={errors.department ? "border-red-500" : ""}
              />
              {errors.department && (
                <p className="text-sm font-medium text-red-600">{errors.department}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Start Examination
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateRegistration;
