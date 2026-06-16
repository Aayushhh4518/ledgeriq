"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  formatter?: (val: number) => string;
  duration?: number;
}

export default function AnimatedCounter({ 
  value, 
  formatter = (v) => v.toLocaleString(),
  duration = 1.5 
}: AnimatedCounterProps) {
  const [mounted, setMounted] = useState(false);
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
    duration: duration * 1000
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  const display = useTransform(springValue, (current) => formatter(current));

  if (!mounted) {
    return <span>{formatter(value)}</span>;
  }

  return <motion.span>{display}</motion.span>;
}
