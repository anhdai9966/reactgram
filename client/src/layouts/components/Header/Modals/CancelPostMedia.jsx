import useLockBodyScroll from "~/hooks/useLockedBody"

function ClearAllRecent() {
    useLockBodyScroll()

    const handleClickCancel = () => {
    }

    const handleDeleteAllRecent = () => {
        console.log('cancel post')
    }

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="bg-white drop-shadow-xl rounded-xl text-center">
                <div className="flex flex-col gap-2 items-center w-[260px] md:w-[400px] p-7 border-b">
                    <h6 className="font-semibold text-lg">Bỏ bài viết?</h6>
                    <p className="text-[#767680] font-light text-sm">Nếu rời đi, bạn sẽ mất những gì vừa chỉnh sửa.</p>
                </div>
                <ul className="flex flex-col text-sm divide-y">
                    <button className="py-1 px-2 h-12 text-[#ed4956] font-semibold hover:bg-[#3c3c43]/[3%]" onClick={handleDeleteAllRecent}>Bỏ</button>
                    <button className="py-1 px-2 h-12 font-light hover:bg-[#3c3c43]/[3%]" onClick={handleClickCancel}>Hủy</button>
                </ul>
            </div>
        </div>
    )
}

export default ClearAllRecent