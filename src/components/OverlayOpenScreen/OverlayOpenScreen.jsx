import { motion } from "framer-motion";

function OverlayOpenScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{duration: .8}}
      className="fixed inset-0 z-50 bg-black/60"
    >
    </motion.div>
  );
}

export default OverlayOpenScreen;
