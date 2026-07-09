type RingTimerProps = {
  secondsLeft: number;
  totalSeconds: number;
  size?: number;
};

export function RingTimer({ secondsLeft, totalSeconds, size = 280 }: RingTimerProps) {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const progress = secondsLeft / totalSeconds;
  const offset = circumference * (1 - progress);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const label = `${minutes}:${String(seconds).padStart(2, '0')}`;

  return (
    <svg width={size} height={size} viewBox="0 0 150 150">
      <circle
        cx={75}
        cy={75}
        r={radius}
        fill="none"
        stroke="#27272a"
        strokeWidth={8}
      />
      <circle
        cx={75}
        cy={75}
        r={radius}
        fill="none"
        stroke="#22c55e"
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 75 75)"
      />
      <text
        x={75}
        y={82}
        textAnchor="middle"
        fill="#fafafa"
        fontSize={24}
        fontFamily="monospace"
      >
        {label}
      </text>
    </svg>
  );
}