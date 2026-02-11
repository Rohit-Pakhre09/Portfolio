"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import DigitalGlobe from "../ui/DigitalGlobe";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_TO_NAME = process.env.NEXT_PUBLIC_EMAILJS_TO_NAME || "Rohit";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  useEffect(() => {
    if (submissionStatus !== "success") return;

    const timeoutId = setTimeout(() => {
      setSubmissionStatus("idle");
      setSubmissionMessage("");
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [submissionStatus]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("idle");
    setSubmissionMessage("");

    if (validate()) {
      setIsSubmitting(true);
      try {
        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
          throw new Error("Email service is not configured.");
        }

        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
              to_name: EMAILJS_TO_NAME,
              from_name: formData.name,
              from_email: formData.email,
              reply_to: formData.email,
              subject: `Portfolio Inquiry from ${formData.name}`,
              message: formData.message,
              time: new Date().toLocaleString(),
            },
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to send message.");
        }

        setSubmissionStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        console.error("Form submission error:", error);
        setSubmissionStatus("error");
        setSubmissionMessage(
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact" className="relative z-10 scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-36 top-28 opacity-55">
          <DigitalGlobe size={380} />
        </div>
      </div>
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
              Contact
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl">
              Let&apos;s Build Something Great
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-300 sm:text-base">
              Share your requirements and timeline. I usually respond within 24 hours.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr]">
            <div className="rounded-3xl border border-white/10 bg-linear-to-br from-white/10 via-white/4 to-transparent p-6 shadow-lg shadow-black/20 backdrop-blur-md sm:p-8">
              <h3 className="text-xl font-semibold text-white">Get In Touch</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                I am open to freelance projects, collaborations, and full-time opportunities. If your team needs a reliable full stack developer, let&apos;s connect.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 px-4 py-3">
                  <FaEnvelope className="h-4 w-4 text-emerald-300" />
                  <a
                    href="mailto:pakhrerohit281@gmail.com"
                    className="text-sm text-neutral-200 transition-colors hover:text-emerald-300"
                  >
                    pakhrerohit281@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 px-4 py-3">
                  <FaPhoneAlt className="h-4 w-4 text-emerald-300" />
                  <a
                    href="tel:+919313464767"
                    className="text-sm text-neutral-200 transition-colors hover:text-emerald-300"
                  >
                    +91 9313464767
                  </a>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 px-4 py-3">
                  <FaMapMarkerAlt className="h-4 w-4 text-emerald-300" />
                  <span className="text-sm text-neutral-200">Surat - Gujarat, India</span>
                </div>
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200">
                  Available for remote & onsite roles, Also long-term product engagements.
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-linear-to-br from-white/10 via-white/4 to-transparent p-5 shadow-xl shadow-black/20 backdrop-blur-md sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-medium text-gray-300"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`block w-full rounded-lg border bg-black/40 px-4 py-2.5 text-white shadow-sm transition-all duration-200 placeholder:text-neutral-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.name ? "border-red-500" : "border-white/15"
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full rounded-lg border bg-black/40 px-4 py-2.5 text-white shadow-sm transition-all duration-200 placeholder:text-neutral-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.email ? "border-red-500" : "border-white/15"
                      }`}
                      placeholder="name@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`block w-full resize-none rounded-lg border bg-black/40 px-4 py-2.5 text-white shadow-sm transition-all duration-200 placeholder:text-neutral-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.message ? "border-red-500" : "border-white/15"
                    }`}
                    placeholder="Tell me about your project..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-emerald-400/30 bg-linear-to-r from-emerald-600 to-teal-700 px-6 py-3 text-base font-medium text-white shadow-lg shadow-emerald-900/30 transition-all duration-200 hover:from-emerald-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
                {submissionStatus === "success" && (
                  <p className="mt-2 text-center text-sm text-green-400">
                    Message sent successfully! Thank you for reaching out.
                  </p>
                )}
                {submissionStatus === "error" && (
                  <p className="mt-2 text-center text-sm text-red-400">
                    {submissionMessage || "Failed to send message. Please check your details and try again."}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactSection;
