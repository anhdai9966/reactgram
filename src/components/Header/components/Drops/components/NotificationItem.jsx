import { Link } from "react-router-dom";
import { IconProfile } from "~/components/UI/Icons";

function NotificationItem() {
  return (
    <div className="relative px-4 py-3 hover:bg-black/5">
      <Link to="/@dailai3110" className="block absolute inset-0 z-0"></Link>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full shrink-0">
          <IconProfile className="text-[#8c8c8c]" />
        </div>
        <div className="w-full">
          <p className="text-sm">
            <span className="font-semibold">dailai3110</span>{" "}
            <span className="font-light">Bắt đầu theo dõi bạn.</span>{" "}
            <span className="text-[#8c8c8c] font-light">6 phút trước</span>
          </p>
        </div>
        <div className="shrink-0 relative z-10">
          <button className="text-white bg-[#007AFF] text-sm px-2 py-1 rounded-md">
            <span className="px-4">Theo dõi</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationItem;
