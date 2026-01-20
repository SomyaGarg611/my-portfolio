"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { TypewriterText } from "@/components/ui/typewriter-text";

export function HeroSection() {
    // Client-side only rendering to avoid hydration errors with Framer Motion
    const [isMounted, setIsMounted] = useState(false);
    const [showSubheading, setShowSubheading] = useState(false);
    const [mainTitleComplete, setMainTitleComplete] = useState(false);
    const mainTitleRef = useRef<string>("");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            <div className="container-max">
                <div className="flex justify-center items-center">
                    {/* Centered Content */}
                    <div className="max-w-3xl space-y-8 text-center">
                        <Badge
                            variant="secondary"
                            className="px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 mx-auto mt-2 md:mt-0"
                        >
                            <div className="flex items-center gap-2">
                                {/* <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> */}
                                <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-transparent bg-clip-text animate-gradient font-medium">Software Engineer I at HashedIn By Deloitte</span>
                            </div>
                        </Badge>

                        <div className="space-y-6">
                            {isMounted ? (
                                <>
                                    <motion.h1
                                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                                    >
                                        <span className="block">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-white">
                                                {!mainTitleComplete ? (
                                                    <TypewriterText
                                                        text="Hi, I'm Somya Garg."
                                                        delay={800}
                                                        speed={80}
                                                        onComplete={() => {
                                                            mainTitleRef.current = "Hi, I'm Somya Garg.";
                                                            setMainTitleComplete(true);
                                                            setShowSubheading(true);
                                                        }}
                                                    />
                                                ) : (
                                                    mainTitleRef.current
                                                )}
                                            </span>
                                        </span>
                                    </motion.h1>

                                    {showSubheading && (
                                        <motion.h2
                                            className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        >
                                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 animate-gradient">
                                                <TypewriterText
                                                    text="Building Scalable AI-Powered Systems"
                                                    delay={200}
                                                    speed={60}
                                                    showCursor={false}
                                                />
                                            </span>
                                        </motion.h2>
                                    )}

                                    <motion.p
                                        className="text-lg md:text-xl text-muted-foreground mx-auto"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                    >
                                        Software Engineer with 1+ years of experience in backend and full-stack development. Built scalable REST APIs and web applications using Python, Node.js, React.js and SQL databases. Delivered Gen AI-powered RAG systems that reduced manual review effort by 90% and accelerated test cycles by 40%.
                                    </motion.p>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter">
                                        <span className="block">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-white">Hi, I&apos;m Somya Garg.</span>
                                        </span>
                                    </h1>

                                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 animate-gradient">
                                            Building Scalable AI-Powered Systems
                                        </span>
                                    </h2>

                                    <p className="text-lg md:text-xl text-muted-foreground mx-auto">
                                        Software Engineer with 1+ years of experience in backend and full-stack development. Built scalable REST APIs and web applications using Python, Node.js, React.js and SQL databases. Delivered Gen AI-powered RAG systems that reduced manual review effort by 90% and accelerated test cycles by 40%.
                                    </p>
                                </>
                            )}
                        </div>

                        {isMounted ? (
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            >
                                <Button
                                    size="lg"
                                    asChild
                                    className="bg-pink-400/10 border border-pink-400/20"
                                >
                                    <a href="/contact" className="text-pink-300">
                                        Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    asChild
                                >
                                    <a href="/resume">
                                        View Resume <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    asChild
                                    className="bg-pink-400/10 border border-pink-400/20"
                                >
                                    <a href="#contact" className="text-pink-300">
                                        Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    asChild
                                >
                                    <a href="/resume">
                                        View Resume <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}