import { motion, AnimatePresence } from "framer-motion";
import "./CSS/Loader.css";
import { useState } from "react";

const Transition = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="preloader"
        initial={{ width: "100%" }}
        animate={{
          width: ["100%", "0%"],
          height: ["100%", "100%", "100%"],
          opacity: [1, 1, 1],
        }}
        transition={{ duration: 2.5, delay: 1.5, ease: "easeInOut" }}
      >
        <div className="text-container">
          <span>
            <motion.div
              initial={{ opacity: 0, y: -150 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.1, ease: "easeInOut" }}
            >
              <img src="/LogoB.svg" alt="Logo" className="logo" />
            </motion.div>
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
export default Transition;
