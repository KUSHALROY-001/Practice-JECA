import { useNavigate } from "react-router-dom";
import { Github, Mail } from "lucide-react";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="mt-16 border-t border-white/10 pt-10 pb-6">
      <div className="flex flex-col items-center gap-4">

        {/* Quick Links */}
        <div className="flex items-center gap-6 text-sm font-semibold text-slate-400">
          <button
            onClick={() => navigate("/")}
            className="transition hover:text-cyan-400"
          >
            Home
          </button>
          <span className="text-white/10">|</span>
          <button
            onClick={() => navigate("/contact")}
            className="transition hover:text-cyan-400"
          >
            Contact
          </button>
          <span className="text-white/10">|</span>
          <a
            href="https://github.com/KUSHALROY-001/Practice-JECA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition hover:text-cyan-400"
          >
            <Github size={15} /> GitHub
          </a>
        </div>

        {/* Help CTA */}
        <button
          onClick={() => navigate("/contact")}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
        >
          <Mail size={15} />
          Found an error or need help? Contact Us
        </button>

        {/* Bottom note */}
        <p className="text-xs text-slate-600 text-center">
          © {new Date().getFullYear()} Practice JECA · Made with ❤️ for WB JECA
          aspirants
        </p>
      </div>
    </footer>
  );
};
