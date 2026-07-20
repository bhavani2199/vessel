'use client';

import { RingTimer } from '@/features/focus/components/ring-timer';
import { useFocusSession } from '@/features/focus/application/use-focus-session';

export default function Home() {
  const { state, secondsLeft, totalSeconds, send } = useFocusSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-950">
      <RingTimer secondsLeft={secondsLeft} totalSeconds={totalSeconds} />
      <p className="text-sm text-zinc-500">{state}</p>
      <div className="flex gap-3">
        {state === 'idle' && (
          <button onClick={() => send('START')} className="rounded-lg bg-green-600 px-4 py-2 text-white">
            Start
          </button>
        )}
        {state === 'focusing' && (
          <>
            <button onClick={() => send('PAUSE')} className="rounded-lg bg-zinc-700 px-4 py-2 text-white">
              Pause
            </button>
            <button onClick={() => send('END')} className="rounded-lg bg-zinc-700 px-4 py-2 text-white">
              End
            </button>
          </>
        )}
        {state === 'paused' && (
          <button onClick={() => send('RESUME')} className="rounded-lg bg-green-600 px-4 py-2 text-white">
            Resume
          </button>
        )}
      </div>
    </main>
  );
}