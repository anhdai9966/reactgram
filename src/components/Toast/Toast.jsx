import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeToast } from "~/app/appSlice";

function Toast() {
  const { toastMessage } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(closeToast());
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#FFCC00] border rounded-lg shadow-2xl p-3 w-60">
      <p className="text-center text-sm">
        {/* Bạn chỉ có thể tải lên file nhỏ hơn 1 Mb! */}
        {toastMessage}
      </p>
    </div>
  );
}

export default Toast;
