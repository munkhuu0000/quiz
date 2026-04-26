"use client";

import { UserButton, useAuth, useClerk } from "@clerk/nextjs";

type LoginProps = { className?: string };

export function Login({ className = "" }: LoginProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const { openSignIn, openSignUp } = useClerk();

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {isLoaded && isSignedIn ? (
        <UserButton />
      ) : (
        <>
          <button
            type="button"
            onClick={() => openSignIn({ fallbackRedirectUrl: "/" })}
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            Нэвтрэх
          </button>
          <button
            type="button"
            onClick={() => openSignUp({ fallbackRedirectUrl: "/" })}
            className="rounded-[18px] bg-[linear-gradient(135deg,#3157ff_0%,#5547ff_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(74,91,255,0.28)] transition hover:brightness-105"
          >
            Бүртгүүлэх
          </button>
        </>
      )}
    </div>
  );
}
