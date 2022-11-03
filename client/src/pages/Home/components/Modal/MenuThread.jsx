import { useDispatch } from "react-redux"
import useLockBodyScroll from "~/hooks/useLockedBody"
import { setHiddenAllModalHome } from "~/pages/Home/PageHomeSlice"

function MenuThread() {
    const dispatch = useDispatch()

    useLockBodyScroll()

    const handleClickCancelModalMenuThread = () => {
        dispatch(setHiddenAllModalHome())
    }

    return (
        <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[400px] p-3">
                <ul className="w-full font-light text-sm rounded-xl overflow-hidden bg-white drop-shadow-xl">
                    <li className="border-b h-12 flex items-center justify-center text-[#ed4956] font-semibold p-2 hover:bg-black/[3%]">
                        Bỏ theo dõi
                    </li>
                    <li className="border-b h-12 flex items-center justify-center p-2 hover:bg-black/[3%]">
                        Thêm vào yêu thích
                    </li>
                    <li className="border-b h-12 flex items-center justify-center p-2 hover:bg-black/[3%]">
                        Đi tới bài viết
                    </li>
                    <li className="border-b h-12 flex items-center justify-center p-2 hover:bg-black/[3%]">
                        Sao chép liên kết
                    </li>
                    <li className="border-b h-12 flex items-center justify-center p-2 hover:bg-black/[3%]">
                        <button className="w-full h-full" onClick={handleClickCancelModalMenuThread}>
                            Hủy
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MenuThread