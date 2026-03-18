import Link from "next/link";

export const Login = () => {
  return (
    <div className="w-full flex gap-5 justify-end items-start">
      <Link href="/signup">
        <div className="w-min-[75px] h-9 bg-[#FFFFFF] rounded-full flex flex-row items-center justify-center gap-1 px-3 py-2">
          <p className="text-[14px] text-[#18181B] font-medium">Sign Up</p>
        </div>
      </Link>
      <Link href="/login">
        <div className="w-min-[65px] h-9 bg-[#EF4444] rounded-full flex flex-row items-center justify-center gap-1 px-3 py-2">
          <p className="text-[14px] text-[#FAFAFA] font-medium">Log In</p>
        </div>
      </Link>
    </div>
  );
};
