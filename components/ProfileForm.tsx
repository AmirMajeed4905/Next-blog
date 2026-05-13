"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && !data.currentPassword) return false;
  return true;
}, { message: "Current password is required to set a new password", path: ["currentPassword"] })
.refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) return false;
  return true;
}, { message: "Passwords do not match", path: ["confirmPassword"] });

type ProfileInput = z.infer<typeof profileSchema>;

export default function ProfileForm({
  user,
}: {
  user: { id: string; name: string; email: string };
}) {
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name },
  });

  async function onSubmit(data: ProfileInput) {
    setLoading(true);
    setError("");
    setSuccess("");

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(result.error ?? "Something went wrong");
      return;
    }

    setSuccess("Profile updated successfully!");
    reset({ name: data.name, currentPassword: "", newPassword: "", confirmPassword: "" });
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Success */}
      {success && (
        <div className="bg-green-500/20 border border-green-500/40 text-green-300 text-sm p-4 rounded-xl flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-sm p-4 rounded-xl flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-6 space-y-5">
        <h3 className="text-white font-semibold text-lg border-b border-purple-900/30 pb-4">
          Basic Information
        </h3>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
          <input
            {...register("name")}
            className={`w-full bg-white/5 border ${errors.name ? "border-red-500" : "border-purple-900/40"} text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
          <input
            value={user.email}
            disabled
            className="w-full bg-white/5 border border-purple-900/20 text-slate-500 rounded-xl px-4 py-3 cursor-not-allowed"
          />
          <p className="text-slate-500 text-xs mt-1">Email cannot be changed</p>
        </div>
      </div>

      {/* Password */}
      <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-6 space-y-5">
        <h3 className="text-white font-semibold text-lg border-b border-purple-900/30 pb-4">
          Change Password
        </h3>
        <p className="text-slate-400 text-sm">Leave blank if you don't want to change your password.</p>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
          <input
            {...register("currentPassword")}
            type="password"
            className={`w-full bg-white/5 border ${errors.currentPassword ? "border-red-500" : "border-purple-900/40"} text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
            placeholder="••••••••"
          />
          {errors.currentPassword && <p className="text-red-400 text-xs mt-1">{errors.currentPassword.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
          <input
            {...register("newPassword")}
            type="password"
            className={`w-full bg-white/5 border ${errors.newPassword ? "border-red-500" : "border-purple-900/40"} text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
            placeholder="••••••••"
          />
          {errors.newPassword && <p className="text-red-400 text-xs mt-1">{errors.newPassword.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
          <input
            {...register("confirmPassword")}
            type="password"
            className={`w-full bg-white/5 border ${errors.confirmPassword ? "border-red-500" : "border-purple-900/40"} text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg shadow-purple-900/30"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </>
          ) : "Save Changes"}
        </button>
      </div>
    </form>
  );
}