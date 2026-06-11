import { motion } from "framer-motion";

interface SkeletonLoaderProps {
  className?: string;
}

export function SkeletonLoader({ className = "" }: SkeletonLoaderProps) {
  return (
    <div className={`relative overflow-hidden bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl ${className}`}>
      <motion.div
        className="absolute inset-0 -translate-x-full"
        animate={{
          translateX: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
        }}
      />
    </div>
  );
}
