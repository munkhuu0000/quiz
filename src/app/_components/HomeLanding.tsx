"use client";

import { useClerk } from "@clerk/nextjs";
import { Login } from "./Login";
import type { ReactNode } from "react";

type Category = {
  label: string;
  icon: ReactNode;
  active?: boolean;
};

const CATEGORIES: Category[] = [
  {
    label: "Start",
    icon: <HomeIcon className="text-[#ff9d9d]" />,
    active: true,
  },
  {
    label: "Art & Literature",
    icon: <PaletteIcon className="text-[#ead8b8]" />,
  },
  { label: "Entertainment", icon: <StarIcon className="text-[#ffc764]" /> },
  { label: "Geography", icon: <GlobeIcon className="text-[#70d7a7]" /> },
  { label: "History", icon: <MuseumIcon className="text-[#efe0c9]" /> },
  { label: "Languages", icon: <ChatIcon className="text-[#fff4c7]" /> },
  { label: "Science & Nature", icon: <LeafIcon className="text-[#c7ed75]" /> },
  { label: "Sports", icon: <BallIcon className="text-[#ff9b62]" /> },
  { label: "Trivia", icon: <QuestionIcon className="text-[#c5b7f6]" /> },
];

export function HomeLanding() {
  const { openSignIn } = useClerk();

  const handleLoginRedirect = () => {
    openSignIn({ fallbackRedirectUrl: "/" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fbf8ef] px-4 py-4 text-[#111] sm:px-6 lg:px-8">
      <BackgroundDoodles />

      <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1840px] flex-col">
        <header className="flex items-center gap-5 border-b border-[#d8d2c6] pb-5">
          <Logo />

          <form className="mx-auto hidden min-h-[108px] w-full max-w-[1180px] items-center justify-center gap-6 rounded-xl bg-[#f4a5a0] px-8 lg:flex">
            <label
              htmlFor="game-pin"
              className="text-[1.9rem] font-black tracking-wide"
            >
              Have fun creating interesting quizzes.
            </label>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#e8e5dc] transition hover:bg-[#dedacf]"
            >
              <SearchIcon />
            </button>
            <Login variant="quiz" />
          </div>
        </header>

        {/* <form className="mt-4 flex min-h-[88px] items-center justify-center gap-4 rounded-xl bg-[#f4a5a0] px-4 lg:hidden">
          <label htmlFor="mobile-game-pin" className="sr-only">
            Join Game? Enter PIN:
          </label>
          <input
            id="mobile-game-pin"
            aria-label="Game PIN"
            inputMode="numeric"
            placeholder="123 456"
            className="h-14 w-full max-w-[280px] rounded-full border-4 border-black bg-white px-7 text-center text-[1.35rem] font-black tracking-wider text-[#9fa3af] outline-none placeholder:text-[#a7abb5]"
          />
        </form> */}

        <nav aria-label="Quiz categories" className="py-6">
          <ul className="grid grid-cols-3 gap-y-5 sm:grid-cols-5 lg:grid-cols-9">
            {CATEGORIES.map((category) => (
              <li key={category.label}>
                <button
                  type="button"
                  className="group flex w-full flex-col items-center gap-2 text-center text-sm font-black text-[#74716a]"
                >
                  <span className="flex h-12 items-center justify-center">
                    {category.icon}
                  </span>
                  <span className="relative leading-tight">
                    {category.label}
                    {category.active ? (
                      <span className="absolute -bottom-3 left-1/2 h-1.5 w-11 -translate-x-1/2 rounded-full bg-black" />
                    ) : null}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="grid flex-1 auto-rows-fr gap-5 lg:grid-cols-2">
          <ActionCard
            art={<DrawingKid />}
            title="Create a quiz"
            description={
              <>
                Play for free with
                <br />
                dozens of participants
              </>
            }
            button="Quiz maker"
            buttonClassName="bg-[#55b37d]"
            onClick={handleLoginRedirect}
          />
          <ActionCard
            art={<ThinkingKid />}
            title="A.I."
            description={
              <>
                Generate a quiz from
                <br />
                any subject
              </>
            }
            button="Quiz generator"
            buttonClassName="bg-[#7ee6ff]"
            onClick={handleLoginRedirect}
          />
        </main>
      </div>
    </div>
  );
}

function ActionCard({
  art,
  title,
  description,
  button,
  buttonClassName,
  onClick,
}: {
  art: ReactNode;
  title: string;
  description: ReactNode;
  button: string;
  buttonClassName: string;
  onClick: () => void;
}) {
  return (
    <section className="relative h-full min-h-82.5 overflow-hidden rounded-xl bg-[#21484d] px-6 py-8 text-[#fff9e8] sm:min-h-87.5 sm:px-10 lg:px-16">
      <Sparkles />
      <div className="grid h-full items-center gap-5 sm:grid-cols-[0.9fr_1fr]">
        <div className="relative z-10 flex justify-center sm:justify-start">
          {art}
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-[2.6rem] font-black leading-none tracking-wide sm:text-[3.6rem] xl:text-[4.2rem]">
            {title}
          </h1>
          <p className="mt-4 text-[1.4rem] font-black leading-[1.35] tracking-wide sm:text-[1.65rem]">
            {description}
          </p>
          <button
            type="button"
            onClick={onClick}
            className={`mt-7 min-w-57.5 rounded-full border-4 border-black px-7 py-3 text-[1.35rem] font-black text-black shadow-[0_7px_0_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 ${buttonClassName}`}
          >
            {button}
          </button>
        </div>
      </div>
    </section>
  );
}

function Logo() {
  return (
    <div className="flex shrink-0 items-center text-[3.2rem] font-black leading-none tracking-[-0.08em] sm:text-[4.3rem]">
      <span className="logo-letter bg-[#ff9999]">Q</span>
      <span className="logo-letter bg-[#ffc36c]">U</span>
      <span className="logo-letter bg-[#ffffa9]">I</span>
      <span className="logo-letter bg-[#b8f6bd]">Z</span>
      <span className="ml-2 tracking-[-0.06em] text-white [-webkit-text-stroke:5px_#000] [paint-order:stroke_fill]">
        .com
      </span>
    </div>
  );
}

function BackgroundDoodles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden text-[#ddd8cf]"
    >
      <span className="absolute left-[15%] top-7 text-4xl font-black opacity-45">
        +
      </span>
      <span className="absolute right-[15%] top-5 h-5 w-5 rounded-full bg-[#e7e3da]" />
      <span className="absolute left-[32%] top-32 h-11 w-11 rounded-full border-[14px] border-[#e8e3d8]" />
      <span className="absolute bottom-6 left-[46%] h-20 w-20 rotate-45 rounded-xl bg-[#e8e3d8]" />
      <span className="absolute right-0 top-[48%] h-20 w-16 rotate-[-25deg] rounded-xl bg-[#e8e3d8]" />
    </div>
  );
}

function Sparkles() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <span className="absolute left-[52px] top-[60px] h-1.5 w-1.5 rounded-full bg-[#fff9e8]" />
      <span className="absolute left-[88px] top-[100px] text-4xl font-black text-[#fff9e8]">
        ✦
      </span>
      <span className="absolute left-[24%] top-7 text-2xl font-black text-[#fff9e8]">
        ✦
      </span>
      <span className="absolute bottom-28 left-[30%] text-4xl font-black text-[#fff9e8]">
        ✦
      </span>
    </div>
  );
}

function DrawingKid() {
  return (
    <svg
      viewBox="0 0 310 260"
      aria-hidden="true"
      className="h-[210px] w-[250px] sm:h-[250px] sm:w-[300px]"
    >
      <g
        fill="none"
        stroke="#fff9e8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
      >
        <path
          d="M115 79c-33 3-47 27-43 55 4 30 27 48 59 46 34-3 55-25 52-57-3-29-31-47-68-44Z"
          fill="#fff9e8"
        />
        <path d="M74 110c-24-4-30 29-8 37" fill="#fff9e8" />
        <path d="M101 78c15-35 58-36 88-10 17 15 34 12 44 4 8 24-21 35-63 19" />
        <path
          d="M119 133c0 7-2 12-7 12s-7-5-7-12 2-12 7-12 7 5 7 12Zm48 0c0 7-2 12-7 12s-7-5-7-12 2-12 7-12 7 5 7 12Z"
          fill="#21484d"
          stroke="#21484d"
        />
        <path d="M124 155c13 13 26 13 39 0" stroke="#21484d" />
        <path d="M92 185c-17 13-26 36-28 61m80-64c13 17 22 37 25 61" />
        <path d="M82 222c34 20 76 20 111 0l66 18-96 25-95-24 14-19Z" />
        <path d="M118 218c3 21 43 24 43 3m-68-7c16 8 32 12 48 14" />
        <path d="M225 148v21m15-2 47-47m-42 69 29-11m-64-30-2 24" />
      </g>
    </svg>
  );
}

function ThinkingKid() {
  return (
    <svg
      viewBox="0 0 310 260"
      aria-hidden="true"
      className="h-[210px] w-[250px] sm:h-[250px] sm:w-[300px]"
    >
      <g
        fill="none"
        stroke="#fff9e8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
      >
        <path
          d="M122 78c-32 3-46 27-42 54 4 30 26 47 58 45 34-3 54-25 51-56-3-29-30-47-67-43Z"
          fill="#fff9e8"
        />
        <path d="M80 109c-24-4-30 29-8 37" fill="#fff9e8" />
        <path d="M100 79c18-34 57-38 89-12 15 12 31 13 41 4 8 24-20 35-60 18" />
        <path
          d="M126 132c0 7-2 12-7 12s-7-5-7-12 2-12 7-12 7 5 7 12Zm46 0c0 7-2 12-7 12s-7-5-7-12 2-12 7-12 7 5 7 12Z"
          fill="#21484d"
          stroke="#21484d"
        />
        <path d="M131 155c12 12 25 12 37 0" stroke="#21484d" />
        <path d="M110 181c-18 9-30 31-34 61m81-61c16 17 24 38 28 61" />
        <path d="M99 224c14 12 32 19 52 19 14 0 27-4 39-11" />
        <path d="M205 180c10 8 20 1 29-22m-23 19 24 12m-70 38c6 22 35 26 42 7" />
        <path d="M46 129c29-1 54-1 74 0m-75 0c21 39 28 76 27 112" />
      </g>
    </svg>
  );
}

function IconShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 44 44"
      aria-hidden="true"
      className={`h-11 w-11 overflow-visible ${className}`}
    >
      {children}
    </svg>
  );
}

function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M7 22 22 8l15 14v15H26V26h-8v11H7V22Z"
        fill="currentColor"
        stroke="#000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

function PaletteIcon({ className = "" }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M22 8C12 8 5 14 5 23c0 8 7 14 17 14h3c4 0 5-5 2-7-2-2 0-5 4-5h2c4 0 6-2 6-5 0-7-7-12-17-12Z"
        fill="currentColor"
        stroke="#000"
        strokeWidth="4"
      />
      <circle cx="15" cy="18" r="2.5" fill="#000" />
      <circle cx="24" cy="15" r="2.5" fill="#000" />
      <circle cx="31" cy="21" r="2.5" fill="#000" />
      <circle cx="18" cy="27" r="2.5" fill="#000" />
    </IconShell>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="m22 6 5 10 11 2-8 8 2 12-10-6-10 6 2-12-8-8 11-2 5-10Z"
        fill="currentColor"
        stroke="#000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <IconShell className={className}>
      <circle
        cx="22"
        cy="22"
        r="16"
        fill="currentColor"
        stroke="#000"
        strokeWidth="4"
      />
      <path
        d="M8 21c7 2 9-7 15-5 5 2 1 7 8 8 5 1 5 5 3 9M21 7c0 5-2 8-7 10m13-8c-2 4 2 7 8 7"
        fill="none"
        stroke="#000"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

function MuseumIcon({ className = "" }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M6 17 22 8l16 9H6Zm4 3h24M12 20v14m7-14v14m7-14v14m7-14v14M8 36h28"
        fill="currentColor"
        stroke="#000"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

function ChatIcon({ className = "" }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M22 8c10 0 17 6 17 14s-7 14-17 14c-3 0-6-1-9-2l-8 4 3-8c-2-2-3-5-3-8C5 14 12 8 22 8Z"
        fill="currentColor"
        stroke="#000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M34 7C19 9 9 18 8 35c16 0 25-10 26-28Z"
        fill="currentColor"
        stroke="#000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M11 33c8-9 14-13 23-20"
        fill="none"
        stroke="#000"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

function BallIcon({ className = "" }: { className?: string }) {
  return (
    <IconShell className={className}>
      <circle
        cx="22"
        cy="22"
        r="16"
        fill="currentColor"
        stroke="#000"
        strokeWidth="4"
      />
      <path
        d="M22 6v32M6 22h32M11 11c10 6 16 14 22 22M33 11C23 17 17 25 11 33"
        fill="none"
        stroke="#000"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

function QuestionIcon({ className = "" }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path
        d="M12 10c8-5 19-1 19 8 0 7-8 7-8 13M11 31h7M31 31h2M13 38h7M29 38h7"
        fill="none"
        stroke="#000"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      className="h-7 w-7 fill-none stroke-black stroke-[3.5]"
    >
      <circle cx="12.5" cy="12.5" r="7.5" />
      <path d="m18 18 6 6" strokeLinecap="round" />
    </svg>
  );
}
