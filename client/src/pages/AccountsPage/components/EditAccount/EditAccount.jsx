import { IconProfile } from "~/components/UI/Icons";

function EditAccount() {
  return (
    <article className="py-8 space-y-4">
      <div className="flex items-center">
        <div className="w-32 shrink-0 mx-8">
          <div className="w-9 h-9 border rounded-full overflow-hidden ml-auto">
            <IconProfile className="text-[#8c8c8c]/60" />
          </div>
        </div>
        <div className="">
          <h2>laidai9966</h2>
          <label className="text-[#007AFF] cursor-pointer">
            <input type="file" name="avatarFile" className="hidden" />
            <span>Thay đổi ảnh đạn diện</span>
          </label>
        </div>
      </div>

      <form className="font-light space-y-4">
        <div className="flex">
          <div className="w-32 h-8 flex items-center justify-end shrink-0 mx-8">
            <label htmlFor="pepName" className="font-semibold">
              Tên
            </label>
          </div>
          <div className="space-y-3 max-w-sm w-full">
            <input
              type="text"
              name="name"
              id="pepName"
              placeholder="Tên"
              className="block border rounded h-8 w-full px-2 outline-none"
            />
            <p className="text-xs text-[#8c8c8c]">
              Hãy lấy tên mà bạn thường dùng để tài khoản của bạn dễ tìm thấy
              hơn. Đó có thể là tên đầy đủ, biệt danh hoặc tên doanh nghiệp
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="w-32 h-8 flex items-center justify-end shrink-0 mx-8">
            <label htmlFor="pepUsername" className="font-semibold">
              Tên người dùng
            </label>
          </div>
          <div className="space-y-3 max-w-sm w-full">
            <input
              type="text"
              name="username"
              id="pepUsername"
              placeholder="Tên người dùng"
              className="block border rounded h-8 w-full px-2 outline-none"
            />
            <p className="text-xs text-[#8c8c8c]"></p>
          </div>
        </div>
        <div className="flex">
          <div className="w-32 h-8 flex items-center justify-end shrink-0 mx-8">
            <label htmlFor="pepLinks" className="font-semibold">
              Trang web
            </label>
          </div>
          <div className="space-y-3 max-w-sm w-full">
            <input
              type="text"
              name="link"
              id="pepLinks"
              placeholder="Trang web"
              className="block border rounded h-8 w-full px-2 outline-none"
            />
            <p className="text-xs text-[#8c8c8c]"></p>
          </div>
        </div>

        <div className="flex">
          <div className="w-32 h-8 flex items-center justify-end shrink-0 mx-8">
            <label htmlFor="pepBio" className="font-semibold">
              Tiểu sử
            </label>
          </div>
          <div className="space-y-3 max-w-sm w-full">
            <textarea
              name="bio"
              id="pepBio"
              cols="30"
              rows="3"
              placeholder="Tiểu sử"
              className="block border rounded w-full p-2 outline-none"
            ></textarea>
            <p className="text-xs text-[#8c8c8c]">
              <span>0</span>
              <span> / 150</span>
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="w-32 h-8 flex items-center justify-end shrink-0 mx-8"></div>
          <div className="space-y-3 max-w-sm w-full">
            <div className="text-[#8c8c8c]">
              <h2 className="text-sm font-semibold">Thông tin cá nhân</h2>
              <p className="text-xs">
                Cung cấp thông tin cá nhân của bạn, bất kể bạn dùng tài khoản
                cho doanh nghiệp, thú cưng hay gì khác. Thông tin này sẽ không
                hiển thị trên trang cá nhân công khai của bạn.
              </p>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="w-32 h-8 flex items-center justify-end shrink-0 mx-8">
            <label htmlFor="pepEmail" className="font-semibold">
              Email
            </label>
          </div>
          <div className="space-y-3 max-w-sm w-full">
            <input
              type="email"
              name="email"
              id="pepEmail"
              placeholder="Email"
              className="block border rounded h-8 w-full px-2 outline-none"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-32 h-8 flex items-center justify-end shrink-0 mx-8">
            <label htmlFor="pepPhone" className="font-semibold">
              Số điện thoại
            </label>
          </div>
          <div className="space-y-3 max-w-sm w-full">
            <input
              type="text"
              name="phone"
              id="pepPhone"
              placeholder="Số điện thoại"
              className="block border rounded h-8 w-full px-2 outline-none"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-32 h-8 flex items-center justify-end shrink-0 mx-8">
            <label htmlFor="pepGender" className="font-semibold">
              Giới tính
            </label>
          </div>
          <div className="space-y-3 max-w-sm w-full">
            <input
              type="text"
              name="gender"
              id="pepGender"
              placeholder="Giới tính"
              value="Không muốn tiết lộ"
              className="block border rounded h-8 w-full px-2 outline-none"
            />
          </div>
        </div>
        <div className="flex py-3">
          <div className="w-32 h-8 flex items-center justify-end shrink-0 mx-8"></div>
          <div className="max-w-sm w-full flex justify-between">
            <button className="font-semibold text-white bg-[#007AFF] rounded-md px-3 py-1">
              Gửi
            </button>
            <button className="text-[#007AFF] font-semibold text-sm hover:bg-black/[5%] px-2 py-1 rounded-md">
              Vô hiệu hóa tài khoản của tôi
            </button>
          </div>
        </div>
      </form>
    </article>
  );
}

export default EditAccount;
