import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return ( 
    <div className="h-full bg-gradient-to-r from-pink-300 via-violet-500 to-teal-300 w-full py-28 px-4">
          <div className="flex flex-col items-center justify-center">
          <SignIn />
          </div>
    </div>
    );
}