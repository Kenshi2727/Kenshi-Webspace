import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import logo from "../../assets/logo-min.png";

export default function PopupBanner({ 
  message, 
  title = "Notification", 
  icon = <img src={logo} alt="Logo" className="w-full h-full object-contain" /> 
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Automatically show the popup shortly after render
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="fixed left-1/2 top-1/2 z-[9999] w-full max-w-sm sm:max-w-md -translate-x-1/2 -translate-y-1/2 px-4 sm:px-0"
        >
          {/* Animated Gradient Border Effect typical of Kenshi theme */}
          <div className="relative overflow-hidden rounded-2xl p-[1px] shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary animate-gradient-x opacity-70" />
            
            {/* Main Card Container */}
            <div className="relative h-full w-full rounded-2xl bg-background/95 backdrop-blur-sm p-4 sm:p-5">
              
              <div className="relative flex items-start gap-4">
                {/* Icon Container with rounded image */}
                <div className="flex h-12 w-12 shrink-0 overflow-hidden items-center justify-center rounded-full bg-primary/10 border border-primary/20 shadow-inner">
                  {icon}
                </div>

                {/* Text Content */}
                <div className="flex-1 pt-0.5 min-w-0">
                  <h4 className="mb-1 text-base font-bold text-foreground truncate bg-clip-text">
                    {title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {message}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  aria-label="Close popup"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
