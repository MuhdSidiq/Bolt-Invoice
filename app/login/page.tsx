"use client";

import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div>
          <h2 className="text-center text-3xl font-bold">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Demo credentials:
            <br />
            Email: user@demo.com
            <br />
            Password: password
          </p>
        </div>
        <LoginForm />
      </Card>
    </div>
  );
}