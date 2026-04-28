type LogoProps = {
  size?: number;
  className?: string;
};

export function Logo({ size = 48, className }: LogoProps) {
  const width = Math.round(size * 1.5);
  return (
    <svg
      role="img"
      aria-label="Sein Wut Hmon Group"
      focusable="false"
      width={width}
      height={size}
      viewBox="0 0 150 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="75" cy="50" rx="70" ry="45" fill="#00ADEE" />

      <text
        x="75"
        y="44"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="0.5"
      >
        SWH
      </text>

      <g
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M75 84 C 62 78, 54 70, 54 58 C 60 64, 68 72, 75 80" />
        <path d="M75 84 C 88 78, 96 70, 96 58 C 90 64, 82 72, 75 80" />
        <line x1="75" y1="80" x2="75" y2="86" />
      </g>
    </svg>
  );
}

export default Logo;
