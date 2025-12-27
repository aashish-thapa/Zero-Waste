"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Leaf, Camera, BookOpen, Home } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/scan", label: "Scan", icon: Camera },
    { href: "/recipes", label: "Recipes", icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-lg border-b border-[#1e1e2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] group-hover:shadow-lg group-hover:shadow-[#8b5cf6]/25 transition-all duration-300">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Zero Waste</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[#1e1e2e] transition-all duration-200"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/scan"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white font-medium hover:opacity-90 hover:shadow-lg hover:shadow-[#8b5cf6]/25 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[#1e1e2e] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#1e1e2e]">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[#1e1e2e] transition-all duration-200"
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              <Link
                href="/scan"
                onClick={() => setIsOpen(false)}
                className="mt-2 mx-4 py-3 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white font-medium text-center hover:opacity-90 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
