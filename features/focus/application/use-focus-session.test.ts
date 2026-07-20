import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useFocusSession } from './use-focus-session';

describe('useFocusSession', () => {
  it('starts idle with a full 15-minute clock', () => {
    const { result } = renderHook(() => useFocusSession());

    expect(result.current.state).toBe('idle');
    expect(result.current.secondsLeft).toBe(15 * 60);
  });

  it('parking a distraction adds it to the list and returns to focusing', () => {
    const { result } = renderHook(() => useFocusSession());

    act(() => {
      result.current.send('START');
    });
    act(() => {
      result.current.send('DISTRACTED');
    });
    act(() => {
      result.current.park('check slack');
    });

    expect(result.current.state).toBe('focusing');
    expect(result.current.distractions).toHaveLength(1);
    expect(result.current.distractions[0].note).toBe('check slack');
  });
});