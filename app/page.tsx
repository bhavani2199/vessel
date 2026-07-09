import { RingTimer } from '@/features/focus/components/ring-timer';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950">
      <RingTimer secondsLeft={540} totalSeconds={900} size={340} />
    </main>
  );
}