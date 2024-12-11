"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { Dashboard } from "@/components/dashboard/dashboard";
import { LoginForm } from "@/components/auth/login-form";

export default function HomePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-bold">Welcome to Invoice Management System</h2>
            <p className="mt-2 text-center text-sm text-gray-600">Please sign in to continue</p>
          </div>
          <LoginForm />
        </div>
      </div>
    );
  }

  return <Dashboard />;
}