import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";

const OpacityLayout = forwardRef((props, ref) => {
  const { isShow = false, children = null, className = "" } = props;

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={ref}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default OpacityLayout;
