
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface TabSwitchGuardProps {
  isActive: boolean;
  onViolation?: () => void;
}

const TabSwitchGuard = ({ isActive, onViolation }: TabSwitchGuardProps) => {
  const { toast } = useToast();
  const warningCountRef = useRef(0);
  const maxWarnings = 3;

  useEffect(() => {
    if (!isActive) return;

    console.log("TabSwitchGuard activated");

    const handleVisibilityChange = () => {
      if (document.hidden) {
        warningCountRef.current++;
        console.log(`Tab switch detected. Warning ${warningCountRef.current}/${maxWarnings}`);
        
        if (warningCountRef.current >= maxWarnings) {
          console.log("Maximum warnings reached. Terminating exam.");
          toast({
            title: "Exam Terminated",
            description: "You have switched tabs too many times. The exam has been automatically submitted.",
            variant: "destructive"
          });
          // Call violation handler after a short delay to ensure toast is visible
          setTimeout(() => {
            onViolation?.();
          }, 1000);
        } else {
          toast({
            title: "Warning!",
            description: `Do not switch tabs during the exam. Warning ${warningCountRef.current}/${maxWarnings}`,
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
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.shiftKey && e.key === "J")
      ) {
        e.preventDefault();
        console.log("Blocked developer tools access attempt");
        toast({
          title: "Action Blocked",
          description: "Developer tools and view source are disabled during the exam",
          variant: "destructive"
        });
      }
    };

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      console.log("Blocked right-click context menu");
    };

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    // Cleanup function
    return () => {
      console.log("TabSwitchGuard deactivated");
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [isActive, onViolation, toast]);

  return null;
};

export default TabSwitchGuard;
