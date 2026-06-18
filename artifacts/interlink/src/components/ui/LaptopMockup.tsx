import { motion } from "framer-motion";

interface LaptopMockupProps {
  imageSrc: string;
  altText: string;
  title?: string;
  showLabelBelow?: boolean;
}

export function LaptopMockup({ imageSrc, altText, title, showLabelBelow = false }: LaptopMockupProps) {
  return (
    <motion.div 
      className="relative flex flex-col items-center w-[280px] sm:w-[320px] md:w-[400px] shrink-0 mx-4 group perspective-1000"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Laptop Lid/Screen */}
      <div className="relative w-full aspect-[16/10] bg-black rounded-t-2xl rounded-b-sm border-[4px] md:border-[6px] border-black shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col z-20">
        {/* Webcam dot */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-zinc-800 rounded-full z-10"></div>
        
        {/* Screen Content */}
        <div className="relative flex-1 w-full bg-zinc-900 mt-2.5 md:mt-3 rounded-sm overflow-hidden">
          <img 
            src={imageSrc} 
            alt={altText} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Optional Overlay/Text - only if NOT showLabelBelow */}
          {title && !showLabelBelow && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 md:p-6 opacity-80 group-hover:opacity-100 transition-opacity">
              <h3 className="text-white font-medium text-lg md:text-xl font-display">{title}</h3>
            </div>
          )}
        </div>
      </div>

      {/* Laptop Base/Keyboard Deck */}
      <div className="relative w-[112%] h-3 md:h-4 bg-zinc-300 dark:bg-zinc-700 rounded-b-xl rounded-t-sm shadow-[0_15px_25px_rgba(0,0,0,0.4)] flex justify-center -mt-[1px] z-10">
        <div className="w-1/4 h-1.5 md:h-2 bg-zinc-400 dark:bg-zinc-600 rounded-b-md"></div>
      </div>

      {/* Label Below */}
      {title && showLabelBelow && (
        <div className="mt-6 text-center">
          <h3 className="text-foreground font-bold text-lg md:text-xl font-display group-hover:text-primary transition-colors">{title}</h3>
        </div>
      )}
    </motion.div>
  );
}
