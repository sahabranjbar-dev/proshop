import { useEffect, useRef, useState, useCallback, useMemo } from "react";

interface UseTimerOptions {
  initialSeconds?: number;
  autoStart?: boolean;
  onFinish?: () => void;
}

interface TimerState {
  seconds: string;
  minutes: string;
  isRunning: boolean;
  isFinished: boolean;
  totalSeconds: number;
}

export function useTimer({
  initialSeconds = 120,
  autoStart = true,
  onFinish,
}: UseTimerOptions = {}) {
  const [timer, setTimer] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (isRunning || timer <= 0) return;

    setIsRunning(true);
  }, [isRunning, timer]);

  const pause = useCallback(() => {
    setIsRunning(false);
    clearTimerInterval();
  }, [clearTimerInterval]);

  const reset = useCallback(
    (newInitialSeconds?: number) => {
      const newTimer = newInitialSeconds ?? initialSeconds;
      setTimer(newTimer);
      setIsRunning(autoStart);
    },
    [initialSeconds, autoStart]
  );

  const restart = useCallback(() => {
    reset();
    if (autoStart) {
      setIsRunning(true);
    }
  }, [reset, autoStart]);

  // مدیریت تایمر
  useEffect(() => {
    if (!isRunning || timer <= 0) {
      clearTimerInterval();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        const newTimer = prev - 1;

        if (newTimer <= 0) {
          clearTimerInterval();
          setIsRunning(false);
          onFinish?.();
          return 0;
        }

        return newTimer;
      });
    }, 1000);

    return clearTimerInterval;
  }, [isRunning, timer, clearTimerInterval, onFinish]);

  // محاسبات بهینه شده
  const timerState = useMemo((): TimerState => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const isFinished = timer <= 0;

    return {
      seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
      minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
      isRunning,
      isFinished,
      totalSeconds: timer,
    };
  }, [timer, isRunning]);

  return {
    ...timerState,
    start,
    pause,
    reset,
    restart,
    setTimer: setTimer,
  };
}
