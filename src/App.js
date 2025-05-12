import React, { useState, useEffect } from "react";
import "./App.css";
import TimerDisplay from "./TimerDisplay";
import TimerButtons from "./TimerButtons";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false); // 타이머 실행 여부
  
  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0); // 타이머 리셋
  }

  // 20초 도달 시 타이머 멈춤 + alert 메세지
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const next = prev + 1;
          if (next === 20) {
            setIsRunning(false);
            alert("20초가 지났습니다!");
          }
          return next;
        });
        }, 1000);
      }
      
      return () => clearInterval(interval);
    }, [isRunning]);

    return (
    <div className="container">
      <TimerDisplay seconds={seconds} />
      <TimerButtons 
        onStart={handleStart} 
        onStop={handleStop}
        onReset={handleReset} />
    </div>
  );
}

export default App;







/**
  // 자동 증가 타이머
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1); // 1초마다 시간 증가
      }, 1000);
    } else {
      clearInterval(interval); // 멈췄을 때 타이머 제거
    }

    // cleanup: 컴포넌트가 unmount되거나 다시 실행될 때 정리
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  return (
    <div className="container">
      <TimerDisplay seconds={seconds} />
      <TimerButtons onStart={handleStart} onStop={handleStop} />
    </div>
  );
}

export default App;
*/