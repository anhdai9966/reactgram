import { IconPaperplaneCircle, IconSquareAndPencil } from "~/components/UI/Icons";

function Inbox() {
  return (
    <div className="h-[var(--window-height)] p-5">
      <div className="w-full h-full flex border divide-x bg-white rounded-xl">
        <div className="h-full divide-y w-80 flex flex-col">
          <div className="py-6 px-4 flex items-center shrink-0">
            <p className="w-full text-center">dailai9966</p>
            <div className="shrink-0">
              <IconSquareAndPencil className="w-5 h-5"/>
            </div>
          </div>
          <div className="h-full overflow-x-hidden overflow-y-auto">
            <ul className="pt-2">
              <li className="animate-pulse flex items-center gap-4 px-4 py-2">
                <div className="w-14 h-14 bg-[#efefef] rounded-full shrink-0"></div>
                <div className="w-full space-y-3">
                  <div className="h-3 bg-[#efefef] w-1/2 rounded"></div>
                  <div className="h-3 bg-[#efefef] w-1/3 rounded"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center p-5">
          <div className="flex flex-col gap-5">
            <div className="text-[#8c8c8c]/50">
              <IconPaperplaneCircle className="w-20 h-20 mx-auto"/>
            </div>
            <div className="space-y-1 font-light text-center">
              <h2 className="text-lg">Tin nhắn của bạn</h2>
              <p className="text-[#8c8c8c] text-sm">Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm.</p>
            </div>
            <div className="w-24 text-sm mx-auto">
              <button className="w-full h-8 border rounded bg-[#0095f6]">
                <span className="text-white font-semibold">Gửi tin nhắn</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inbox;
