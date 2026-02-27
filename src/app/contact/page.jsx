"use client";

import { useState } from "react";
import { ModernCard, Section } from "@/components/ui/ModernCard";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Send, Plus, Minus } from "lucide-react";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "How long does the battery last?",
      a: "Under normal daily usage (syncing 3 times a day), the battery lasts approximately 30 days. You can check the exact percentage in the mobile app.",
    },
    {
      q: "Is it completely leak-proof?",
      a: "Yes. Our proprietary seal mechanism ensures absolutely zero leaks when properly closed, even when turned upside-down or shaken vigorously.",
    },
    {
      q: "Can I put hot drinks in it?",
      a: "Absolutely. The dual-vacuum insulation will keep your coffee or tea piping hot for up to 14 hours without the exterior getting warm to the touch.",
    },
    {
      q: "How do I clean the smart lid?",
      a: "The smart lid should be hand-washed only using warm soapy water. Do not submerge the lid or place it in a dishwasher, as it houses the electronic components.",
    },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Section className="py-0 md:py-0 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          Let's Connect.
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Have a question about your smart bottle? Need press materials? We're
          here to help.
        </p>
      </Section>

      <Section className="py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <ModernCard className="p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-500">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-500">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">
                  Subject
                </label>
                <select className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-green transition-colors appearance-none">
                  <option>General Inquiry</option>
                  <option>Support & Troubleshooting</option>
                  <option>Press & Media</option>
                  <option>Wholesale</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors resize-none"
                ></textarea>
              </div>

              <Button className="w-full py-4 mt-4" size="lg">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </form>
          </ModernCard>

          {/* Contact Details & FAQ */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ModernCard className="p-6 bg-brand-green/10 border-brand-green/30 text-brand-green">
                <Mail className="w-8 h-8 mb-4" />
                <h4 className="font-bold text-lg text-white mb-1">Email Us</h4>
                <p className="text-sm">support@thermos.io</p>
                <p className="text-sm">press@thermos.io</p>
              </ModernCard>

              <ModernCard className="p-6">
                <Phone className="w-8 h-8 mb-4 text-gray-500" />
                <h4 className="font-bold text-lg mb-1">Call Us</h4>
                <p className="text-sm text-gray-400">1-800-THERMOS</p>
                <p className="text-sm text-gray-400">Mon-Fri 9am - 5pm EST</p>
              </ModernCard>

              <ModernCard className="p-6 sm:col-span-2">
                <MapPin className="w-8 h-8 mb-4 text-gray-500" />
                <h4 className="font-bold text-lg mb-1">Headquarters</h4>
                <p className="text-sm text-gray-400">
                  123 Design District Blvd.
                  <br />
                  San Francisco, CA 94107
                </p>
              </ModernCard>
            </div>

            {/* FAQs Accordion */}
            <div>
              <h3 className="text-3xl font-bold mb-6">Frequently Asked</h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <ModernCard
                    key={idx}
                    className="cursor-pointer overflow-hidden transition-all duration-300"
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  >
                    <div className="p-6 pr-12 flex justify-between items-center relative z-20 bg-[#111]">
                      <h4 className="font-semibold">{faq.q}</h4>
                      <div className="absolute right-6 text-brand-green">
                        {openFaq === idx ? (
                          <Minus className="w-5 h-5" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                    {/* Collapsible Content Area */}
                    <div
                      className={`px-6 text-gray-400 bg-black/40 transition-all duration-300 ease-in-out ${
                        openFaq === idx
                          ? "max-h-40 py-6 border-t border-white/5 opacity-100"
                          : "max-h-0 py-0 opacity-0"
                      }`}
                    >
                      {faq.a}
                    </div>
                  </ModernCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
