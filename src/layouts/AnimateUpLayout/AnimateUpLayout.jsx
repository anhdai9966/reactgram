import { delay, motion } from "framer-motion";

function AnimateUpLayout({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ y: "100px", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      exit={{ y: "100px", opacity: 0 }}
      transition={{ duration: 0.3, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimateUpLayout;
