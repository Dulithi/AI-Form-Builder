import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return( 
  <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
        <div className="flex flex-col items-center justify-center">
            <SignUp />
        </div>
  </div>
  );
}