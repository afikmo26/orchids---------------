"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "בית", href: "#home" },
  { name: "מי אנחנו", href: "#about" },
  { name: "שירותים", href: "#services" },
  { name: "פרויקטים", href: "#projects" },
  { name: "צור קשר", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const phoneNumber = "054-568-7588";
  const logoUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/5781fdf5-42d8-4372-a8f6-bbe014e74177-1767019453245.jfif";

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl py-4 shadow-2xl border-b border-primary/20"
          : "bg-transparent py-8"
      }`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Image 
                src={logoUrl} 
                alt="Logo" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-3xl font-bold tracking-tighter text-white">לי <span className="text-primary">מתכות</span></span>
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">60 שנה של ניסיון</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center space-x-12 space-x-reverse md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold transition-all hover:text-primary relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 right-0 w-0 h-1 bg-primary transition-all group-hover:w-full rounded-full" />
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-6 md:flex">
              <a href={`tel:${phoneNumber.replace(/-/g, '')}`} className="flex items-center gap-3 text-xl font-bold text-white hover:text-primary transition-colors dir-ltr">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 group">
                  <Phone size={20} className="group-hover:animate-bounce" />
                </div>
                  {phoneNumber}
              </a>
              <Button className="bg-primary hover:bg-red-700 text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/20" asChild>
                <Link href="#contact">קבלו הצעה</Link>
              </Button>
            </div>

          {/* Mobile Toggle */}
          <button
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute left-0 top-full w-full bg-black/95 backdrop-blur-2xl p-6 shadow-2xl md:hidden border-t border-primary/20"
          >
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-black text-white hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/5 space-y-6">
                <a href={`tel:${phoneNumber.replace(/-/g, '')}`} className="block text-2xl font-black text-primary dir-ltr">
                  {phoneNumber}
                </a>
                <Button asChild className="w-full bg-primary text-white font-black py-8 text-xl rounded-2xl">
                  <Link href="#contact" onClick={() => setIsOpen(false)}>
                    קבלו הצעת מחיר
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
