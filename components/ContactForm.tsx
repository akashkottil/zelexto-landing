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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
          to: "zelexto@gmail.com",
          from_name: formData.name,
          subject: `New inquiry from ${formData.name} — Zelexto`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        // Fallback: open mailto
        window.location.href = `mailto:zelexto@gmail.com?subject=${encodeURIComponent(`New inquiry from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        setSubmitted(true);
      }
    } catch {
      // Fallback: open mailto
      window.location.href = `mailto:zelexto@gmail.com?subject=${encodeURIComponent(`New inquiry from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="glass rounded-2xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        >
          <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
        </motion.div>
        <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2 font-[family-name:var(--font-space-grotesk)]">
          Thank you!
        </h3>
        <p className="text-[#888]">
          We&apos;ll get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-6 sm:p-8 space-y-5"
      noValidate
    >
      <div>
        <label htmlFor="name" className="block text-sm text-[#888] mb-1.5">
          Your Name
        </label>
        <motion.div
          animate={focused === "name" ? { scale: 1.01 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
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
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
              errors.name
                ? "border-red-500"
                : focused === "name"
                  ? "border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.06)]"
                  : "border-white/10"
            } text-[#F5F5F5] placeholder-gray-500 focus:outline-none transition-all duration-300`}
            placeholder="John Doe"
          />
        </motion.div>
        {errors.name && (
          <motion.p
            className="text-red-400 text-xs mt-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.name}
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-[#888] mb-1.5">
          Email Address
        </label>
        <motion.div
          animate={focused === "email" ? { scale: 1.01 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
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
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
              errors.email
                ? "border-red-500"
                : focused === "email"
                  ? "border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.06)]"
                  : "border-white/10"
            } text-[#F5F5F5] placeholder-gray-500 focus:outline-none transition-all duration-300`}
            placeholder="john@startup.com"
          />
        </motion.div>
        {errors.email && (
          <motion.p
            className="text-red-400 text-xs mt-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.email}
          </motion.p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm text-[#888] mb-1.5"
        >
          Your Message
        </label>
        <motion.div
          animate={focused === "message" ? { scale: 1.01 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
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
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
              errors.message
                ? "border-red-500"
                : focused === "message"
                  ? "border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.06)]"
                  : "border-white/10"
            } text-[#F5F5F5] placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none`}
            placeholder="Tell us about your project..."
          />
        </motion.div>
        {errors.message && (
          <motion.p
            className="text-red-400 text-xs mt-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.message}
          </motion.p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        className="btn-primary w-full px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        data-hover
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send size={18} />
          </>
        )}
      </motion.button>
    </form>
  );
}
