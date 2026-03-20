import { useEffect, useState } from "react";

export function FloatingBlobs() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* GUFRAM inspired soft glowing shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/30 mix-blend-multiply filter blur-[80px] opacity-70 animate-float"></div>
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-secondary/30 mix-blend-multiply filter blur-[80px] opacity-70 animate-float-delayed"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-accent/30 mix-blend-multiply filter blur-[100px] opacity-60 animate-float"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-orange-400/20 mix-blend-multiply filter blur-[60px] opacity-50 animate-float-delayed" style={{ animationDelay: "2s" }}></div>
    </div>
  );
}
