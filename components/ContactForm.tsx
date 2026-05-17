"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      window.location.href = `mailto:hello@zelexto.com?subject=${encodeURIComponent(
        `New inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="rounded-2xl border border-violet/25 bg-violet/[0.04] p-10 text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        >
          <CheckCircle className="text-violet-soft mx-auto mb-4" size={44} />
        </motion.div>
        <h3 className="font-display text-2xl text-canvas mb-2">Thank you.</h3>
        <p className="text-graphite-soft text-sm">
          Your mail client opened. We&apos;ll respond within 24 hours.
        </p>
      </motion.div>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 rounded-xl bg-canvas/[0.03] border ${
      errors[field as keyof FormErrors]
        ? "border-red-500/50"
        : focused === field
          ? "border-violet/45 shadow-[0_0_20px_rgba(108,92,231,0.12)]"
          : "border-canvas/[0.08]"
    } text-canvas placeholder-graphite focus:outline-none transition-all duration-300 text-sm`;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-canvas/[0.06] bg-canvas/[0.02] p-7 sm:p-8 space-y-5"
      noValidate
    >
      <div>
        <label
          htmlFor="name"
          className="micro-label block mb-2"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          className={inputClass("name")}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-400/80 text-xs mt-1.5">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="micro-label block mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          className={inputClass("email")}
          placeholder="you@studio.com"
        />
        {errors.email && (
          <p className="text-red-400/80 text-xs mt-1.5">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="micro-label block mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: undefined });
          }}
          className={`${inputClass("message")} resize-none`}
          placeholder="A few words about the project."
        />
        {errors.message && (
          <p className="text-red-400/80 text-xs mt-1.5">{errors.message}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        className="btn-violet w-full px-6 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={16} /> Send message
          </>
        )}
      </motion.button>
    </form>
  );
}
