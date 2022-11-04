import { useLockedBody } from "~/hooks";

function ClearAllRecent({ toggle }) {
  useLockedBody(true);

  const handleClickCancel = () => {
    toggle();
  };

  const handleDeleteAllRecent = () => {
    console.log("delete all recent");
    handleClickCancel();
  };

  return (
    <div className="bg-white drop-shadow-xl rounded-xl text-center">
      <div className="flex flex-col gap-2 items-center w-[260px] md:w-[400px] p-7 border-b">
        <h6 className="font-semibold text-lg">Xóa lịch sử tìm kiếm?</h6>
        <p className="text-[#767680] font-light text-sm">
          Bạn sẽ không thể hoàn tác hành động này. Nếu xóa lịch sử tìm kiếm, có
          thể bạn vẫn nhìn thấy các tài khoản mình đã tìm trong kết quả gợi ý.
        </p>
      </div>
      <ul className="flex flex-col text-sm divide-y">
        <button
          className="py-1 px-2 h-12 text-[#ed4956] font-semibold hover:bg-[#3c3c43]/[3%]"
          onClick={handleDeleteAllRecent}
        >
          Xóa tất cả
        </button>
        <button
          className="py-1 px-2 h-12 font-light hover:bg-[#3c3c43]/[3%]"
          onClick={handleClickCancel}
        >
          Lúc khác
        </button>
      </ul>
    </div>
  );
}

export default ClearAllRecent;
