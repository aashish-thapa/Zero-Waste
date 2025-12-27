import Link from "next/link";
import { Leaf, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-[#1e1e2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6]">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Zero Waste Kitchen</span>
            </Link>
            <p className="text-[#71717a] max-w-md">
              Reduce food waste with AI-powered ingredient detection and smart recipe suggestions.
              Making sustainable cooking easy and accessible for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[#71717a] hover:text-[#8b5cf6] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/scan" className="text-[#71717a] hover:text-[#8b5cf6] transition-colors">
                  Scan Ingredients
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="text-[#71717a] hover:text-[#8b5cf6] transition-colors">
                  Recipes
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1e1e2e] text-[#71717a] hover:text-white hover:bg-[#8b5cf6]/20 transition-all duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1e1e2e] text-[#71717a] hover:text-white hover:bg-[#3b82f6]/20 transition-all duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1e1e2e] text-[#71717a] hover:text-white hover:bg-[#06b6d4]/20 transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#1e1e2e] text-center">
          <p className="text-[#71717a] text-sm">
            © {new Date().getFullYear()} Zero Waste Kitchen. Built with sustainability in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
