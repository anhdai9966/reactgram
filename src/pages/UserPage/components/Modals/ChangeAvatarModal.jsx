import { useRef } from "react";

function ChangeAvatarModal({ setFalse, handleUpload, handleRemove }) {
  const btnList = useRef([
    {
      id: 0,
      title: <span className="text-[#007AFF] font-semibold">Tải ảnh lên</span>,
      onClick: () => {
        handleUpload();
      },
    },
    {
      id: 1,
      title: (
        <span className="text-[#FF3B30] font-semibold">Gỡ ảnh hiện tại</span>
      ),
      onClick: () => {
        handleRemove()
      },
    },
    {
      id: 2,
      title: "Hủy",
      onClick: () => {
        setFalse();
      },
    },
  ]);
  return (
    <div className="w-96">
      <div className="bg-white rounded-xl overflow-hidden divide-y">
        <h3 className="text-lg px-9 pt-9 pb-4 text-center">
          Thay đổi ảnh đại diện
        </h3>
        <ul className="mt-4 divide-y">
          {btnList.current.map((btn) => (
            <li key={btn.id} className="px-2 py-1">
              <button
                onClick={btn.onClick}
                className="font-light w-full text-center text-sm py-2"
              >
                {btn.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChangeAvatarModal;
