import { useForm } from "react-hook-form";
import { IconProfile } from "~/components/UI/Icons";
import InputItem from "../InputItem";
import TextareaItem from "./components/TextareaItem";

function EditAccount() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      email: "dailai3110@gmail.com",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <article className="py-8 space-y-4">
      <div className="flex gap-4 lg:gap-6 px-2 items-center">
        <div className="px-2 h-8 flex items-center lg:justify-end lg:w-36 shrink-0">
          <div className="w-9 h-9 border rounded-full overflow-hidden">
            <IconProfile className="text-[#8c8c8c]/60" />
          </div>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <h2 className="text-lg">laidai9966</h2>
          <label className="text-[#007AFF] cursor-pointer">
            <input type="file" name="avatarFile" className="hidden" />
            <span>Thay đổi ảnh đạn diện</span>
          </label>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-light space-y-4 px-2"
      >
        <div className="">
          <InputItem
            register={register("full_name")}
            type="text"
            placeholder="Tên"
            title="Tên"
            text={
              <p className="text-xs text-[#8c8c8c]">
                Hãy lấy tên mà bạn thường dùng để tài khoản của bạn dễ tìm thấy
                hơn. Đó có thể là tên đầy đủ, biệt danh hoặc tên doanh nghiệp
              </p>
            }
          />
        </div>

        <div className="">
          <InputItem
            register={register("username")}
            type="text"
            placeholder="Tên người dùng"
            title="Tên người dùng"
          />
        </div>

        <div className="">
          <InputItem
            register={register("bio_url")}
            type="text"
            placeholder="Trang web"
            title="Trang web"
          />
        </div>

        <div className="">
          <TextareaItem
            register={register("bio")}
            type="text"
            placeholder="Tiểu sử"
            title="Tiểu sử"
            rows={3}
            text={
              <p className="text-xs text-[#8c8c8c]">
                <span>0</span>
                <span> / 150</span>
              </p>
            }
          />
        </div>

        <div className="">
          <InputItem
            text={
              <div className="text-[#8c8c8c]">
                <h2 className="text-sm font-semibold">Thông tin cá nhân</h2>
                <p className="text-xs">
                  Cung cấp thông tin cá nhân của bạn, bất kể bạn dùng tài khoản
                  cho doanh nghiệp, thú cưng hay gì khác. Thông tin này sẽ không
                  hiển thị trên trang cá nhân công khai của bạn.
                </p>
              </div>
            }
          />
        </div>

        <div className="">
          <InputItem
            register={register("email")}
            type="email"
            placeholder="Email"
            disabled={true}
            title="Email"
          />
        </div>
        <div className="">
          <InputItem
            type="text"
            placeholder="Giới tính"
            register={register("gender")}
            title="Giới tính"
            onFocus={() => {
              // Không muốn tiết lộ
              console.log("forcus");
            }}
          />
        </div>

        <div className="">
          <InputItem
            text={
              <div className="w-full flex justify-between">
                <button className="font-semibold text-white bg-[#007AFF] rounded-md px-3 py-1">
                  Gửi
                </button>
                <div className="text-[#007AFF] font-semibold text-sm hover:bg-black/[5%] px-2 py-1 rounded-md flex items-center cursor-pointer">
                  Vô hiệu hóa tài khoản của tôi
                </div>
              </div>
            }
          />
        </div>
      </form>
    </article>
  );
}

export default EditAccount;
