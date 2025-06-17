
import { Clock } from "lucide-react";

interface TimerProps {
  timeLeft: number;
}

const Timer = ({ timeLeft }: TimerProps) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const isLowTime = timeLeft <= 300; // 5 minutes or less
  const isCriticalTime = timeLeft <= 60; // 1 minute or less

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg ${
      isCriticalTime 
        ? "bg-red-100 text-red-800 animate-pulse" 
        : isLowTime 
        ? "bg-yellow-100 text-yellow-800" 
        : "bg-blue-100 text-blue-800"
    }`}>
      <Clock size={20} />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

export default Timer;
