import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:info@oula.co.za?subject=Enquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.name)}%0AEmail: ${encodeURIComponent(form.email)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] pt-20">
      {/* Header */}
      <div className="bg-[#1a3a2a] py-16 px-6 text-center">
        <p className="text-[#d4af70] text-xs tracking-[0.4em] uppercase mb-3">Get in Touch</p>
        <h1 className="font-serif text-5xl text-white mb-4">Contact Us</h1>
        <p className="text-white/60 max-w-lg mx-auto text-sm leading-relaxed">
          We'd love to hear from you. Send us a message or reach out directly.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="font-serif text-3xl text-[#1a3a2a] mb-8">We're Here For You</h2>
            <p className="text-gray-600 leading-relaxed mb-10">
              Whether you have a question about our rooms, need help with a booking, or simply want to learn more about what Oula Guesthouse offers — our team is happy to assist.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#1a3a2a] flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[#d4af70]" />
                </div>
                <div>
                  <p className="text-xs tracking-wider uppercase text-gray-400 mb-1">Email</p>
                  <a href="mailto:info@oula.co.za" className="text-[#1a3a2a] font-medium hover:underline">
                    info@oula.co.za
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#1a3a2a] flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#d4af70]" />
                </div>
                <div>
                  <p className="text-xs tracking-wider uppercase text-gray-400 mb-1">Phone</p>
                  <a href="tel:+27123456789" className="text-[#1a3a2a] font-medium hover:underline">
                    +27 (0) 12 345 6789
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#1a3a2a] flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#d4af70]" />
                </div>
                <div>
                  <p className="text-xs tracking-wider uppercase text-gray-400 mb-1">Address</p>
                  <p className="text-[#1a3a2a] font-medium leading-relaxed">
                    12 Acacia Avenue<br />Johannesburg, South Africa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#1a3a2a] flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-[#d4af70]" />
                </div>
                <div>
                  <p className="text-xs tracking-wider uppercase text-gray-400 mb-1">Reception Hours</p>
                  <p className="text-[#1a3a2a] font-medium leading-relaxed">
                    Monday – Sunday: 06:00 – 22:00<br />
                    <span className="text-sm text-gray-500">Emergency line available 24/7</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-[#f0f7f2] p-6">
              <h3 className="text-xs tracking-[0.3em] uppercase text-[#1a3a2a] font-semibold mb-3">
                Check-in &amp; Check-out
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Check-in</p>
                  <p className="text-[#1a3a2a] font-semibold">From 14:00</p>
                </div>
                <div>
                  <p className="text-gray-400">Check-out</p>
                  <p className="text-[#1a3a2a] font-semibold">By 11:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white p-8 shadow-sm">
            <h3 className="font-serif text-2xl text-[#1a3a2a] mb-6">Send an Enquiry</h3>
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#f0f7f2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={28} className="text-[#1a3a2a]" />
                </div>
                <h4 className="font-serif text-xl text-[#1a3a2a] mb-2">Message Sent</h4>
                <p className="text-gray-500 text-sm">Your email client should have opened. We'll reply as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-500 mb-1.5">Your Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a2a] transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-500 mb-1.5">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a2a] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-500 mb-1.5">Message *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    rows={5}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1a3a2a] transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1a3a2a] text-white py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#2a5a3e] transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Send size={15} />
                  Send Message
                </button>
                <p className="text-center text-xs text-gray-400">
                  We reply to all enquiries within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
