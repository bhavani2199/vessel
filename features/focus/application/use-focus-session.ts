import { useEffect, useReducer, useState } from 'react';
import { transition, type FocusState, type FocusEvent } from '../domain/focus-state';

const SPRINT_SECONDS = 15 * 60;


export function useFocusSession() {
  const [state, dispatch] = useReducer(transition, 'idle');
  const [secondsLeft, setSecondsLeft] = useState(SPRINT_SECONDS);
  const [distractions, setDistractions] = useState<{ note: string; createdAt: number }[]>([]);

  useEffect(() => {
    if (state !== 'focusing') return;

    const id = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);

    return () => clearInterval(id);
  }, [state]);

  function send(event: FocusEvent) {
    if (event === 'START') setSecondsLeft(SPRINT_SECONDS);
    dispatch(event);
  }

  function park(note: string) {
    setDistractions((prev) => [...prev, { note, createdAt: Date.now() }]);
    dispatch('PARK');
    dispatch('RESUME');
  }

  function dismiss() {
    dispatch('DISMISS');
  }

  return { state, secondsLeft, totalSeconds: SPRINT_SECONDS, send, park, dismiss, distractions };
}