import { AnimatePresence, motion } from "framer-motion";

function ToastLayout({ children, isShow, className }) {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{
            opacity: 0,
            transform: "translateX(-50%) translateY(100%) scale(0)",
          }}
          animate={{
            opacity: 1,
            transform: "translateX(-50%) translateY(0) scale(1)",
          }}
          exit={{
            opacity: 0,
            transform: "translateX(-50%) translateY(100%) scale(0)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ToastLayout;
