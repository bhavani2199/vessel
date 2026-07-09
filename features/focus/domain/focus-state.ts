export type FocusState = 'idle' | 'focusing' | 'paused' | 'pivoting' | 'holding';

export type FocusEvent =
  | 'START'
  | 'PAUSE'
  | 'RESUME'
  | 'DISTRACTED'
  | 'PARK'
  | 'DISMISS'
  | 'END';

export function transition(state: FocusState, event: FocusEvent): FocusState {
  switch (state) {
    case 'idle':
      return event === 'START' ? 'focusing' : state;

    case 'focusing':
      if (event === 'PAUSE') return 'paused';
      if (event === 'DISTRACTED') return 'pivoting';
      if (event === 'END') return 'idle';
      return state;

    case 'paused':
      if (event === 'RESUME') return 'focusing';
      if (event === 'END') return 'idle';
      return state;

    case 'pivoting':
      if (event === 'PARK') return 'holding';
      if (event === 'DISMISS') return 'focusing';
      return state;

    case 'holding':
      return event === 'RESUME' ? 'focusing' : state;
  }
}