import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";

const DropLayout = forwardRef((props, ref) => {
  const {
    isShow = false,
    children = null,
    isShowDown = false,
    isShowUp = true,
    className = '',
  } = props;

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ opacity: 1, scale: "20%", x: 0 }}
          animate={{ opacity: 1, scale: "100%", x: 0 }}
          exit={{ opacity: 0, scale: "20%", x: 0 }}
          style={{ originX: 0, originY: +(isShowUp && !isShowDown) }}
          ref={ref}
          className={`absolute left-0 z-40 ${className} ${isShowDown && "top-full"} ${
            isShowUp && !isShowDown && "bottom-full"
          }`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default DropLayout;
