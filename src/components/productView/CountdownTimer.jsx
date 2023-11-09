import React, { useState, useEffect } from "react";
import styles from "./ProductView.module.scss";

// ! replace
function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();

    return difference > 0
      ? {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
      : null;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);
      if (updatedTimeLeft === null) {
        setIsTimerExpired(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className={isTimerExpired ? styles.timerExpired : null}>
      {isTimerExpired ? (
        <span className={styles.timerExpiredText}>Збір закрито</span>
      ) : (
        <div>
          {timeLeft ? (
            <span>
              {timeLeft.days}
              {" "}
              дн.
              {timeLeft.hours}
              {" "}
              год.
              {timeLeft.minutes}
              {" "}
              хв.
              {timeLeft.seconds}
              {" "}
              сек.
            </span>
          ) : (
            <span className={styles.endTime}>00:00:00</span>
          )}
        </div>
      )}
    </div>
  );
}

export default CountdownTimer;
