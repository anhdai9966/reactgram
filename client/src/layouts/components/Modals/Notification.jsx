import images from "~/assets/images"

function Notification() {
  
  return (
    <div className="bg-white w-96 border rounded-xl overflow-hidden">
      <div className="px-8 pt-4">
        <div className="w-20 h-20 mx-auto">
          <img src={images.reactgramLauncher} alt="reactgram launcher" />
        </div>
      </div>
      <div className="space-x-2 text-center font-extralight border-b px-8 py-4">
        <h2 className="text-lg">Bật thông báo</h2>
        <p className="text-sm text-[#8c8c8c]">Bạn sẽ biết khi mọi người theo dõi hoặc like và comment ảnh của bạn.</p>
      </div>
      <ul className="font-light text-sm divide-y">
        <li className="hover:bg-black/[3%] px-2 py-1">
          <button className="w-full h-10 text-[#007AFF]">Bật</button>
        </li>
        <li className="hover:bg-black/[3%] px-2 py-1">
          <button className="w-full h-10">Để sau</button>
        </li>
      </ul>
    </div>
  )
}

export default Notification