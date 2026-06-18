import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface PeachAvatarProps {
  className?: string;
}

export function PeachAvatar({ className }: PeachAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/peach-source.jpg";
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Identify blue background and remove it (set alpha 0)
      // The background is likely a flat sky blue #72b1e4 or similar
      // We check if the pixel has significant blue content relative to red & green
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // "Blue" heuristic: if blue dominates red and green
        const isBlue = b > r + 20 && b > g + 10 && b > 100;
        
        // Also a more targeted sky blue tolerance (approximate flat blue match)
        // Adjusting based on general bright sky blue characteristics:
        const isSkyBlue = r < 150 && g > 100 && g < 220 && b > 180;

        if (isBlue || isSkyBlue) {
          // Make pixel transparent
          data[i + 3] = 0;
        } else {
           // For anti-aliased edges that are slightly blended with blue:
           // If it's kinda blueish/greyish bordering the blue, reduce opacity
           if (b > r && b > g && b > 100) {
             data[i + 3] = data[i+3] * 0.5; // partial transparency for smooth edges
           }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setIsLoaded(true);
    };
  }, []);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: isLoaded ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`relative inline-flex items-center justify-center overflow-visible drop-shadow-xl ${className}`}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
      />
    </motion.div>
  );
}
