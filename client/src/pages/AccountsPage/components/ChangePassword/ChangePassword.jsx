import { IconProfile } from "~/components/UI/Icons";

function ChangePassword() {
  return (
    <article className="py-8 space-y-4">
      <div className="flex items-center">
        <div className="w-32 shrink-0 mx-8">
          <div className="w-9 h-9 border rounded-full overflow-hidden ml-auto">
            <IconProfile className="text-[#8c8c8c]/60" />
          </div>
        </div>
        <div className="">
          <h2 className="text-lg">laidai9966</h2>
        </div>
      </div>
      <form className="font-light space-y-4">
        <div className="flex">
          <div className="w-32 h-8 flex items-center justify-end shrink-0 mx-8">
            <label htmlFor="pepUsername" className="font-semibold">
              Mật khẩu cũ
            </label>
          </div>
          <div className="space-y-3 max-w-sm w-full">
            <input
              type="text"
              name="oldPassword"
              id="pepOldPassword"
              placeholder="Mật khẩu cũ"
              className="block border rounded h-8 w-full px-2 outline-none bg-[#fafafa]"
            />
            <p className="text-xs text-[#8c8c8c]"></p>
          </div>
        </div>
        <div className="flex">
          <div className="w-32 h-8 flex items-center justify-end shrink-0 mx-8">
            <label htmlFor="pepUsername" className="font-semibold">
              Mật khẩu mới
            </label>
          </div>
          <div className="space-y-3 max-w-sm w-full">
            <input
              type="password"
              name="newPassword"
              id="pepNewPassword"
              placeholder="Mật khẩu mới"
              className="block border rounded h-8 w-full px-2 outline-none bg-[#fafafa]"
            />
            <p className="text-xs text-[#8c8c8c]"></p>
          </div>
        </div>
        <div className="flex">
          <div className="w-32 h-8 flex items-center justify-end shrink-0 mx-8">
            <label htmlFor="pepUsername" className="font-semibold text-end">
              Xác nhận mật khẩu mới
            </label>
          </div>
          <div className="space-y-3 max-w-sm w-full">
            <input
              type="password"
              name="confirmNewPassword"
              id="pepConfirmNewPassword"
              placeholder="Xác nhận mật khẩu mới"
              className="block border rounded h-8 w-full px-2 outline-none bg-[#fafafa]"
            />
            <p className="text-xs text-[#8c8c8c]"></p>
          </div>
        </div>
        <div className="flex">
          <div className="w-32 h-8 flex items-center justify-end shrink-0 mx-8"></div>
          <div className="space-y-3 max-w-sm w-full">
            <div className="">
              <button className="font-semibold text-white bg-[#007AFF] rounded-md px-3 py-1">
                Đổi mật khẩu
              </button>
            </div>
            <div>
              <button className="text-[#007AFF] font-semibold text-sm hover:bg-black/[5%] px-2 py-1 rounded-md">
                Quên mật khẩu
              </button>
            </div>
          </div>
        </div>
      </form>
    </article>
  );
}

export default ChangePassword;
