"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["transparent", "rgba(16, 20, 24, 0.95)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "backdrop-blur-xl border-b border-white/10 shadow-2xl"
        : "backdrop-blur-sm border-b border-white/5"
        }`}
      style={{ backgroundColor: headerBackground }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container-max">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-rose-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-white group-hover:text-pink-300 transition-colors duration-300">
                  Somya Garg
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${isActive(item.href)
                    ? "text-pink-300"
                    : "text-gray-300 hover:text-white"
                    }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute inset-0 bg-pink-400/10 border border-pink-400/20 rounded-lg"
                      layoutId="activeNav"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="sm"
              className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-300 hover:to-rose-400 text-white border-0 shadow-lg hover:shadow-pink-400/25 transition-all duration-300"
              asChild
            >
              <Link href="/resume">
                Resume
                <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <motion.div
                className="flex flex-col h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                {/* Mobile Header */}
                <motion.div
                  className="p-6 border-b border-white/10"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href="/"
                    className="flex items-center gap-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div>
                      <div className="font-semibold text-white">
                        Somya Garg
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-6 space-y-6">
                  {navItems.map((item, index) => {
                    const navLabels = ["HOME", "PROJECTS", "ABOUT", "EXPERIENCE", "CONTACT"];

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -50, rotateY: -15 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.2 + (index * 0.1),
                          ease: [0.16, 1, 0.3, 1],
                          type: "spring",
                          stiffness: 100,
                          damping: 15
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="group block relative transition-all duration-300"
                        >
                          {/* Hover background */}
                          <div className={`absolute inset-0 bg-gradient-to-r from-pink-400/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-4 -my-1 rounded-lg ${isActive(item.href) ? "opacity-100" : ""
                            }`} />

                          <div className="relative py-2">
                            {/* Navigation text */}
                            <h2 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isActive(item.href)
                              ? "text-pink-300"
                              : "text-gray-400 group-hover:text-white"
                              }`}>
                              {navLabels[index]}
                            </h2>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Mobile Footer */}
                <motion.div
                  className="p-6 border-t border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-300 hover:to-rose-400 text-white border-0 mb-8"
                      asChild
                    >
                      <Link href="/resume">
                        View Resume
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
                  >
                    <motion.h3
                      className="text-pink-400 text-base font-medium mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 1.1 }}
                    >
                      Socials
                    </motion.h3>
                    <div className="flex gap-8">
                      {["GitHub", "LinkedIn"].map((social, index) => (
                        <motion.a
                          key={social}
                          href={social === "GitHub" ? "https://github.com/vanshaj-pahwa" : "https://linkedin.com/in/vanshaj-pahwa"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors duration-300 text-base font-medium"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 1.2 + (index * 0.1) }}
                        >
                          {social}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
