"use client";
import { signIn, signOut } from "next-auth/react";

export default function AuthButtons() {
  return (
    <div className="space-x-4">
      <button
        onClick={() => signIn()}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        Sign In
      </button>
      <button
        onClick={() => signOut()}
        className="bg-red-600 px-4 py-2 rounded text-white"
      >
        Sign Out
      </button>
    </div>
  );
}
