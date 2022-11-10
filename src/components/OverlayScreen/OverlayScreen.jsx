import { motion } from "framer-motion";

function OverlayScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: .8}}
      className="fixed inset-0 z-50 bg-black/60"
    >
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <IconSpinner8SpinsWhite className="w-8 h-8 animate-spinner12Spins" />
      </div> */}
    </motion.div>
  );
}

export default OverlayScreen;
