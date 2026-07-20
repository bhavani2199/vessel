'use client';

import { useState } from 'react';

type PivotModalProps = {
  open: boolean;
  onPark: (note: string) => void;
  onDismiss: () => void;
};

export function PivotModal({ open, onPark, onDismiss }: PivotModalProps) {
  const [note, setNote] = useState('');

  if (!open) return null;

  function handlePark() {
    if (!note.trim()) return;
    onPark(note.trim());
    setNote('');
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-80 rounded-xl bg-zinc-900 p-5">
        <p className="mb-3 text-sm text-zinc-400">What pulled your attention?</p>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mb-4 w-full rounded-lg bg-zinc-800 px-3 py-2 text-white outline-none"
          placeholder="e.g. check Slack"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            onClick={handlePark}
            disabled={!note.trim()}
            className="flex-1 rounded-lg bg-green-600 px-3 py-2 text-white disabled:opacity-40"
          >
            Park it
          </button>
          <button
            onClick={onDismiss}
            className="flex-1 rounded-lg bg-zinc-700 px-3 py-2 text-white"
          >
            Never mind
          </button>
        </div>
      </div>
    </div>
  );
}