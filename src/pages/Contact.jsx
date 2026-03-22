import { useState } from "react";
import { Mail, MessageSquare, Send, ArrowLeft, User, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const toEmail = "lifeisapakage@gmail.com";
    const formattedBody = `Name: ${name}\nUniversity: ${university || "Not Provided"}\n\nMessage:\n${message}`;

    // Detect mobile device
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent);

    if (isMobile) {
      // On mobile: open native Gmail app via mailto: scheme
      const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;
      window.location.href = mailtoLink;
    } else {
      // On desktop: open Gmail web compose window
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(toEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;
      window.open(gmailUrl, "_blank");
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950 px-3 py-10 md:px-10">
      {/* Background gradients matching home page */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.15),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.1),_transparent_40%),linear-gradient(135deg,_rgba(15,23,42,0.95),_rgba(30,41,59,0.9))]" />
      
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <Link
          to="/"
          className="group mb-12 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-bold tracking-wide text-slate-200 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300"
        >
          <ArrowLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1" /> 
          Back to Home
        </Link>

        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-400/20">
            <Mail size={32} />
          </div>
          <h1 className="text-3xl font-black text-white md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-slate-400">
            Have questions about the JECA Mocks or spotted an error? Send us an email and we'll get back to you.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl md:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wide text-slate-300">Your Name</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-cyan-500/60">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full rounded-2xl border border-cyan-500/20 bg-slate-900/50 py-4 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-400/30"
                  />
                </div>
              </div>

              {/* University Name (Optional) */}
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wide text-slate-300">
                  University Name <span className="font-medium text-slate-500">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-cyan-500/60">
                    <GraduationCap size={18} />
                  </div>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="e.g. Calcutta University"
                    className="w-full rounded-2xl border border-cyan-500/20 bg-slate-900/50 py-4 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-400/30"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-bold tracking-wide text-slate-300">Subject</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-cyan-500/60">
                    <MessageSquare size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Issue with Mock Test 4"
                    className="w-full rounded-2xl border border-cyan-500/20 bg-slate-900/50 py-4 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-400/30"
                  />
                </div>
              </div>
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-bold tracking-wide text-slate-300">Message</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your query or provide feedback here..."
                rows={6}
                className="w-full resize-none rounded-2xl border border-cyan-500/20 bg-slate-900/50 p-4 text-white placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-cyan-400 py-4 text-lg font-black text-slate-950 transition hover:bg-cyan-300 active:scale-[0.98]"
            >
              <Send size={20} /> Send via Gmail
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
