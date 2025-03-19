"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedGradientBackgroundProps {
    className?: string;
    intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 80 + Math.random() * 100, // Increased width for better visibility
        length: height * 3, // Slightly longer beams
        angle: angle,
        speed: 1.2 + Math.random() * 1.5, // Slightly faster movement
        opacity: 0.35 + Math.random() * 0.15, // Increased base opacity
        hue: 190 + Math.random() * 30, // Keeping original blue hues
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
    };
}

export function BeamsBackground({ className, intensity = "medium" }: AnimatedGradientBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const MINIMUM_BEAMS = 12; // Balanced number of beams

    const opacityMap = { subtle: 0.9, medium: 1.1, strong: 1.3 };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

            const totalBeams = MINIMUM_BEAMS * 1.3; // Optimized beam count
            beamsRef.current = Array.from({ length: totalBeams }, () => createBeam(canvas.width, canvas.height));
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            const pulsingOpacity = beam.opacity * (0.9 + Math.sin(beam.pulse) * 0.3) * opacityMap[intensity];

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
            gradient.addColorStop(0, `hsla(${beam.hue}, 100%, 70%, 0)`);
            gradient.addColorStop(0.1, `hsla(${beam.hue}, 100%, 70%, ${pulsingOpacity * 0.6})`);
            gradient.addColorStop(0.4, `hsla(${beam.hue}, 100%, 70%, ${pulsingOpacity})`);
            gradient.addColorStop(0.6, `hsla(${beam.hue}, 100%, 70%, ${pulsingOpacity})`);
            gradient.addColorStop(0.9, `hsla(${beam.hue}, 100%, 70%, ${pulsingOpacity * 0.6})`);
            gradient.addColorStop(1, `hsla(${beam.hue}, 100%, 70%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function animate() {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = "blur(5px)"; // Adjusted blur for better visibility

            beamsRef.current.forEach((beam) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;
                if (beam.y + beam.length < -100) beam.y = canvas.height + 100;
                drawBeam(ctx, beam);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [intensity]);

    return (
        <div className={cn("relative min-h-screen w-full overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-700 to-purple-900", className)}>
            <canvas ref={canvasRef} className="absolute inset-0" style={{ filter: "blur(4px)" }} />
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-700 to-purple-900"
                animate={{ opacity: [0.3, 0.5, 0.3] }} // Improved visibility
                transition={{ duration: 10, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
                style={{ backdropFilter: "blur(12px)" }}
            />
            <div className="relative z-10 flex h-screen w-full items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
                    <motion.h1
                        className="text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-2xl lg:text-3xl text-white/80 tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                    </motion.p>
                </div>
            </div>
        </div>
    );
}
