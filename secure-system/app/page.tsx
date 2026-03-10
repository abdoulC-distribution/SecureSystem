import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl p-10 w-[420px] text-center">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Auth System
        </h1>
        <br />

        <div className="flex flex-col gap-4">

          <Link
            href="/register"
            className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Register
          </Link>

          <Link
            href="/login"
            className="bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-black transition"
          >
            Login
          </Link>

          <Link
            href="/dashboard"
            className="border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Dashboard
          </Link>

        </div>

      </div>

    </main>
  );
}