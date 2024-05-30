"use client"

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";

import { SignIn } from "@/components/SignButtons/sign-in";
import createUsername from "./createUsername";

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
      <button type="submit" disabled={pending} className={`px-4 py-2 text-white rounded ${pending ? "bg-slate-500" : "bg-blue-500 hover:bg-blue-400"}`}>{pending ? "Please wait..." : "Create username"}</button>
  )
}

export default function PageSelector({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  if (!session && pathname == "/"){
    return (
      <div className="flex flex-col min-h-screen justify-center text-center space-y-10">
        <h1 className="text-9xl font-bold text-blue-500">OpenBlog</h1>
        <p className="text-base">
          Welcome to the free and opensource blogging social network!
        </p>
        <SignIn />
      </div>
    );
  }

  if (!session?.user.userName) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form className="p-6 bg-white rounded shadow-md" action={createUsername}>
        <h1 className="text-xl font-semibold">Create a Username</h1>
        <input 
          type="text" 
          name="userName" 
          placeholder="Username" 
          required 
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <SubmitButton />
      </form>
    </div>
  )
}

  return (
    <>
      { children }
    </>
  );
}
