export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      className="block shrink-0"
    >
      <rect x="1" y="1" width="30" height="30" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="22" cy="11" r="3" fill="var(--sun)" />
      <path d="M4 25 L13 13 L19 21 L22 17 L28 25 Z" fill="currentColor" />
    </svg>
  );
}
