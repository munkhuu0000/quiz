type IconProps = {
  className?: string;
};

export function SparklesIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-4 w-4 ${className}`}>
      <path
        d="M10 2.5l1.3 3.4 3.4 1.3-3.4 1.3L10 12l-1.3-3.5-3.4-1.3 3.4-1.3L10 2.5zm5.3 8.8l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8zM4.7 11.7l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SidebarIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-4 w-4 ${className}`}>
      <path
        d="M4 5.5h12M4 10h12M4 14.5h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FileTextIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-4 w-4 ${className}`}>
      <path
        d="M6 3.5h5l3 3V16a1 1 0 0 1-1 1H6.5A1.5 1.5 0 0 1 5 15.5V5A1.5 1.5 0 0 1 6.5 3.5z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10.5 3.8V7h3.1M7.5 10h5M7.5 12.8h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-4 w-4 ${className}`}>
      <path
        d="M6 6l8 8M14 6l-8 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StatusCheckIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-5 w-5 ${className}`}>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6.8 10.2l2.1 2.1 4.3-4.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StatusXIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-5 w-5 ${className}`}>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M7.5 7.5l5 5m0-5l-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-4 w-4 ${className}`}>
      <path
        d="M4 10h12M11 5.5L16 10l-5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
