import { IconTagCircle } from "~/components/UI/Icons"

function Tagged() {
  
  return (
    <div>
      <div className="font-light px-11 py-14 text-center max-w-sm mx-auto space-y-3">
        <div className="w-20 h-20 mx-auto">
          <IconTagCircle className="text-[#8c8c8c]/60" />
        </div>
        <h2 className="text-2xl">Ảnh có mặt bạn</h2>
        <p className="text-sm">Khi mọi người gắn thẻ bạn trong ảnh, ảnh sẽ xuất hiện tại đây.</p>
      </div>
    </div>
  )
}

export default Tagged