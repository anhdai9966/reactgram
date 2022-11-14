import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";

const DownLayout = forwardRef((props, ref) => {
  const { isShow = false, children = null, className = "" } = props;

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
          ref={ref}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default DownLayout;
