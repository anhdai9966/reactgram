import { IconPlus } from "~/components/UI/Icons";

function Saved() {
  return (
    <div>
      <div className="flex justify-between items-center font-light">
        <p className="text-xs text-[#8c8c8c]">Chỉ mình bạn có thể xem mục mình đã lưu</p>
        <button className="text-[#007AFF] text-sm hover:bg-black/[3%] px-2 py-1 rounded">
          <div className="flex items-center gap-1">
            <div className="">
              <IconPlus className="w-3 h-3"/>
            </div>
            <span>Bộ sưu tập mới</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Saved;
