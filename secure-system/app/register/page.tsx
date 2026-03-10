"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created!");
      router.push("/login");
    } else {
      alert(data.message);
    }

  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[420px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            className="border p-3 rounded-lg"
            placeholder="Name"
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            className="border p-3 rounded-lg"
            placeholder="Email"
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input
            type="password"
            className="border p-3 rounded-lg"
            placeholder="Password"
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Register
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>

      </div>

    </main>
  );
}