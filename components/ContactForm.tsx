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
        window.location.href = `mailto:zelexto@gmail.com?subject=${encodeURIComponent(`New inquiry from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        setSubmitted(true);
      }
    } catch {
      window.location.href = `mailto:zelexto@gmail.com?subject=${encodeURIComponent(`New inquiry from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}>
          <CheckCircle className="text-[#25D366] mx-auto mb-4" size={48} />
        </motion.div>
        <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2 font-[family-name:var(--font-space-grotesk)]">Thank you!</h3>
        <p className="text-[#888]">We&apos;ll get back to you within 24 hours.</p>
      </motion.div>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border ${
      errors[field as keyof FormErrors]
        ? "border-red-500/50"
        : focused === field
          ? "border-[#ff6b6b]/30 shadow-[0_0_20px_rgba(255,107,107,0.06)]"
          : "border-white/[0.08]"
    } text-[#F5F5F5] placeholder-[#555] focus:outline-none transition-all duration-300 text-sm`;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 sm:p-8 space-y-5"
      noValidate
    >
      <div>
        <label htmlFor="name" className="block text-[12px] uppercase tracking-[0.15em] text-[#666] mb-2">Name</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
          onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: undefined }); }}
          className={inputClass("name")}
          placeholder="John Doe"
        />
        {errors.name && <motion.p className="text-red-400/80 text-xs mt-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.name}</motion.p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-[12px] uppercase tracking-[0.15em] text-[#666] mb-2">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: undefined }); }}
          className={inputClass("email")}
          placeholder="john@startup.com"
        />
        {errors.email && <motion.p className="text-red-400/80 text-xs mt-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.email}</motion.p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-[12px] uppercase tracking-[0.15em] text-[#666] mb-2">Message</label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          onChange={(e) => { setFormData({ ...formData, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: undefined }); }}
          className={`${inputClass("message")} resize-none`}
          placeholder="Tell us about your project..."
        />
        {errors.message && <motion.p className="text-red-400/80 text-xs mt-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.message}</motion.p>}
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        className="btn-accent w-full px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        data-hover
      >
        {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={16} /> Send Message</>}
      </motion.button>
    </form>
  );
}
