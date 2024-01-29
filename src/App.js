import { useState, useRef } from "react";
import "./App.css";

import alarmSound from './alarm1.mp3'

// Helper function to prepend "0" on minutes & seconds
const padTime = (time) => {
  return time.toString().padStart(2, "0");
};

const App = () => {
  // State Variables
  const [timeLeft, setTimeLeft] = useState(25 * 60);
 
  const [isRunning, setIsRunning] = useState(false);
 
  const intervalRef = useRef(null);

  const [save,setSave]=useState(25*60)
 

  // Functions

  // Strat Timer Function
  const startTimer = () => {
    if (intervalRef.current !== null) return;

   
    setIsRunning(true);

    // Creating a interval to update the time in every 1 second
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft > 0) return timeLeft - 1;
        if (timeLeft == 0) return playAlarmSound();

        resetTimer();

        return 0;
      });
    }, 1000);
  };

  // Stop Timer Function
  const stopTimer = () => {
    if (intervalRef.current === null) return;

   
    setIsRunning(false);

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Reset Timer Function (almost same as Stop Timer Function)
  const resetTimer = () => {
  
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  const sethandler=(e)=>{
    setSave(e.target.value*60)
  }

  const handletimer=()=>{
        setTimeLeft(save)
  }

  const playAlarmSound = () => {
    const audio = new Audio(alarmSound);
    audio.play();
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 10000); // Stop the sound after 5 seconds
  };

  // Computing - calculating minutes & seconds from 'timeLeft'
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  // This returns React Element which acts as the virtual DOM
  return (
    <>
    <div className="app">
      <h1>pomodora timer</h1>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      
  
      
     </div>
     <div className="customise">
     <h1>Customize timer</h1>
      <h2>Set timer(seconds)</h2>
      <input type='text' onChange={sethandler} size={50} ></input>
      <button>cancel</button>
      <button onClick={handletimer}>save</button>
      </div>
      </div>
    </>
  );
};

export default App;