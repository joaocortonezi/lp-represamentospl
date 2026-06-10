function Base({ paths, className }: { paths: string[]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <Base
      className={className}
      paths={[
        "M4 4h16v16H4V4Z",
        "M16 11.4a4 4 0 1 1-7.9 1 4 4 0 0 1 7.9-1Z",
        "M17.5 6.5h.01",
      ]}
    />
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <Base
      className={className}
      paths={[
        "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2Z",
      ]}
    />
  );
}
