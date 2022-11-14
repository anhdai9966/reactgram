import { motion } from "framer-motion";

function OverlayCloseScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: .8}}
      className="fixed inset-0 z-50 bg-black/60"
    >
    </motion.div>
  );
}

export default OverlayCloseScreen;
