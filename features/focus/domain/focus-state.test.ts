import { describe, it, expect } from 'vitest';
import { transition } from './focus-state';

describe('focus state machine', () => {
  it('starts a session from idle', () => {
    expect(transition('idle', 'START')).toBe('focusing');
  });

  it('pauses an active session', () => {
    expect(transition('focusing', 'PAUSE')).toBe('paused');
  });

  it('opens the pivot flow when distracted', () => {
    expect(transition('focusing', 'DISTRACTED')).toBe('pivoting');
  });

  it('ends an active session', () => {
    expect(transition('focusing', 'END')).toBe('idle');
  });

  it('resumes a paused sessionq', () => {
    expect(transition('paused', 'RESUME')).toBe('focusing');
  });

  it('ends a paused session', () => {
    expect(transition('paused', 'END')).toBe('idle');
  });

  it('parks a distraction into the vault', () => {
    expect(transition('pivoting', 'PARK')).toBe('holding');
  });

  it('dismisses a distraction and returns to focus', () => {
    expect(transition('pivoting', 'DISMISS')).toBe('focusing');
  });

  it('resumes focus after parking', () => {
    expect(transition('holding', 'RESUME')).toBe('focusing');
  });
});

describe('ignores illegal events', () => {
  it('cannot pause when nothing is running', () => {
    expect(transition('idle', 'PAUSE')).toBe('idle');
  });

  it('cannot start a session that is already running', () => {
    expect(transition ('focusing', 'START')).toBe('focusing');
  });

  it('cannot park when no distraction was flagged', () => {
    expect(transition ('idle', 'PARK')).toBe('idle');
  });
});