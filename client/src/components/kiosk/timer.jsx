import React, { useState, useEffect } from "react";

export default function CountdownTimer({ minutes, timerOut, setRemaining }) {
  const [seconds, setSeconds] = useState(minutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        return setRemaining(seconds - 1);
      }

      clearInterval(timer);
      timerOut();
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, timerOut, setRemaining]);

  // Helper function to format the remaining time as "mm:ss"
  const formatTime = timeInSeconds => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return <span>{formatTime(seconds)}</span>;
}
