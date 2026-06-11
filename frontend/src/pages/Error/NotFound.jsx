import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gradient-bg">
      <h1 className="text-8xl font-bold">404</h1>

      <p className="text-xl text-gray-400 mt-4">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-8 bg-primary px-6 py-3 rounded-xl"
      >
        Go Home
      </Link>
    </div>
  );
}