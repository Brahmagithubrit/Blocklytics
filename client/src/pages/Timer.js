import React, { useState, useEffect, useRef } from "react";
import "../styles/Timer.css";

export default function Timer({ triggerRefresh }) {
  const [time, setTime] = useState(20);
  const [showLoader, setShowLoader] = useState(false);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const formatTimer = (time) => `${time < 10 ? "0" : ""}${time}`;

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const startTimer = () => {
    clearInterval(intervalRef.current); // ✅ prevent stacking intervals
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setShowLoader(true);

          // Instead of calling `triggerRefresh` immediately, set a timeout
          timeoutRef.current = setTimeout(() => {
            setTime(20);
            setShowLoader(false);
            triggerRefresh(); // Trigger the refresh after the timeout
            startTimer(); // restart cleanly
          }, 1000);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="Head">
      {showLoader ? (
        <div className="loader"></div>
      ) : (
        <>
          <p>Refresh</p>
          {formatTimer(time)}
        </>
      )}
    </div>
  );
}
