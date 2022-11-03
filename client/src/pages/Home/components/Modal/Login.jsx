import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IconXmark } from "~/components/Icons";
import { Logo } from "~/components/Logo";

function Login({ setFalse }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const emailInputValue = watch("email");
  const passwordInputValue = watch("password");

  const handleClickBtnClose = () => {
    setFalse();
  };

  return (
    <div className="h-[var(--window-height)] overflow-y-auto flex items-center">
      <div className="w-96 bg-white border rounded-xl">
        <div className="mt-3 px-3 flex justify-end">
          <button
            onClick={handleClickBtnClose}
            className="p-2 rounded-md hover:bg-black/[3%]"
          >
            <IconXmark className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-9 mb-3">
          <Logo className="h-12 w-44 mx-auto" />
        </div>
        <div className="p-6 text-sm font-light">
          <div className="w-[270px] mx-auto">
            <form
              autoComplete="off"
              className="grid grid-cols-1 grid-rows-4 gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="relative text-xs">
                <label
                  htmlFor="emailInput"
                  className={`absolute top-2 left-2 text-[#8c8c8c] cursor-auto transition-transform origin-top-left ${
                    emailInputValue ? "scale-[.8] -translate-y-2" : "scale-100"
                  }`}
                >
                  Email
                </label>
                <input
                  type="text"
                  id="emailInput"
                  className="relative outline-none border border-gray-300 rounded bg-black/5 p-2 w-full"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="relative text-xs">
                <label
                  htmlFor="passwordInput"
                  className={`absolute top-2 left-2 text-[#8c8c8c] cursor-auto transition-transform origin-top-left ${
                    passwordInputValue
                      ? "scale-[.8] -translate-y-2"
                      : "scale-100"
                  }`}
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  id="passwordInput"
                  className="relative outline-none border border-gray-300 rounded bg-black/5 p-2 w-full"
                />
              </div>
              <label className="w-fit flex gap-2 items-center ml-1 cursor-pointer">
                <input type="checkbox" />
                <span className="text-xs">Lưu thông tin đăng nhập</span>
              </label>
              <button className="h-8 border rounded bg-[#0095f6]">
                <span className="text-white font-semibold">Đăng nhập</span>
              </button>
            </form>
            {errors.email && (
              <div className="text-red-500 text-center mt-5">
                <p>
                  Tên người dùng bạn đã nhập không thuộc về tài khoản. Vui lòng
                  kiểm tra tên người dùng của bạn và thử lại.
                </p>
              </div>
            )}
            <div className="text-center mt-5">
              <Link to="/" className="text-xs">
                Quên mật khẩu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
