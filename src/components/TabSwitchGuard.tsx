
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface TabSwitchGuardProps {
  isActive: boolean;
  onViolation?: () => void;
}

const TabSwitchGuard = ({ isActive, onViolation }: TabSwitchGuardProps) => {
  const { toast } = useToast();

  useEffect(() => {
    if (!isActive) return;

    let warningCount = 0;
    const maxWarnings = 3;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        warningCount++;
        
        if (warningCount >= maxWarnings) {
          toast({
            title: "Exam Terminated",
            description: "You have switched tabs too many times. The exam has been automatically submitted.",
            variant: "destructive"
          });
          onViolation?.();
        } else {
          toast({
            title: "Warning!",
            description: `Do not switch tabs during the exam. Warning ${warningCount}/${maxWarnings}`,
            variant: "destructive"
          });
        }
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave the exam?";
      return "Are you sure you want to leave the exam?";
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+U, etc.
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.shiftKey && e.key === "C")
      ) {
        e.preventDefault();
        toast({
          title: "Action Blocked",
          description: "Developer tools and view source are disabled during the exam",
          variant: "destructive"
        });
      }
    };

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [isActive, onViolation, toast]);

  return null;
};

export default TabSwitchGuard;
