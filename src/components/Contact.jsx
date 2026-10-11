import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Github, Linkedin } from './icons/BrandIcons';
import { motion } from 'motion/react';
import SectionHeading from './SectionHeading';
import { siteConfig } from '../config/siteConfig';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please provide a subject.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionStatus(null);
    setStatusMessage('');

    try {
      if (siteConfig.socialLinks.contactApiUrl) {
        // Send to configured endpoint
        const response = await fetch(siteConfig.socialLinks.contactApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Server responded with an error.');
        }

        setSubmissionStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback: Mailto link generation
        // Simulate a small delay for UX feedback
        await new Promise((resolve) => setTimeout(resolve, 600));

        const mailtoUrl = `mailto:${siteConfig.socialLinks.email}?subject=${encodeURIComponent(
          `[Portfolio Contact] ${formData.subject}`
        )}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;

        window.location.href = mailtoUrl;

        setSubmissionStatus('success');
        setStatusMessage(
          'Your default email client has been opened with your message ready to send.'
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      setSubmissionStatus('error');
      setStatusMessage('Failed to deliver message. Please reach out directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 relative"
      aria-label="Contact Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get In Touch"
          title="Let's Build Something Together"
          subtitle="Have a project idea or want to connect? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-slate-200/80 dark:border-white/10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Let's discuss opportunities
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                I am actively building impactful full-stack and frontend applications, exploring new tools, and collaborating on real-world solutions.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`mailto:${siteConfig.socialLinks.email}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-100 dark:bg-dark-800 hover:bg-violet-50 dark:hover:bg-violet-950/30 text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 dark:text-slate-500">Email Address</p>
                    <p className="text-sm font-semibold truncate">{siteConfig.socialLinks.email}</p>
                  </div>
                </a>

                <a
                  href={siteConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-100 dark:bg-dark-800 hover:bg-violet-50 dark:hover:bg-violet-950/30 text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:scale-105 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 dark:text-slate-500">GitHub Profile</p>
                    <p className="text-sm font-semibold truncate">github.com/{siteConfig.github.username}</p>
                  </div>
                </a>

                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-100 dark:bg-dark-800 hover:bg-violet-50 dark:hover:bg-violet-950/30 text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400 dark:text-slate-500">LinkedIn Profile</p>
                    <p className="text-sm font-semibold truncate">linkedin.com/in/muskan-kumari</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-5"
            >
              {submissionStatus && (
                <div
                  role="alert"
                  className={`p-4 rounded-2xl flex items-start gap-3 text-sm ${
                    submissionStatus === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  {submissionStatus === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <span>{statusMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Smith"
                    className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm transition-all ${
                      errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-white/10'
                    }`}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Your Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm transition-all ${
                      errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-white/10'
                    }`}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-rose-500">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Subject <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Project Inquiry / Opportunity"
                  className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm transition-all ${
                    errors.subject ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-white/10'
                  }`}
                />
                {errors.subject && <p className="mt-1.5 text-xs text-rose-500">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details about your project or inquiry..."
                  className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm transition-all resize-y ${
                    errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-white/10'
                  }`}
                />
                {errors.message && <p className="mt-1.5 text-xs text-rose-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-violet-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
