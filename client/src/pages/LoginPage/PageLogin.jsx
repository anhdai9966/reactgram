import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LogoGoogle, LogoReactgram } from "~/components/UI/Logos";
import images from "~/assets/images";
import HasFooterLayout from "~/layouts/FooterLayout";
import { useDocumentTitle } from "~/hooks";

function PageLogin() {
  useDocumentTitle("Reactgram");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const emailInputValue = watch("email");
  const passwordInputValue = watch("password");

  return (
    <HasFooterLayout>
      <div className="container h-full">
        <div className="h-full flex justify-center items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-96 bg-[#f0cdd8] hidden lg:block rounded-xl overflow-hidden">
              <img src={images.signin} alt="signin" />
            </div>
            <div className="w-full sm:w-96 space-y-3">
              <div className="bg-white border rounded-xl">
                <div className="mt-9 mb-3">
                  <LogoReactgram className="h-12 w-44 mx-auto text-[#333]" />
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
                            emailInputValue
                              ? "scale-[.8] -translate-y-2"
                              : "scale-100"
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
                        <span className="text-white font-semibold">
                          Đăng nhập
                        </span>
                      </button>
                    </form>
                    <div className="flex justify-evenly items-center py-4">
                      <div className="w-24 border-t"></div>
                      <p className="uppercase text-xs font-semibold text-[#8c8c8c]">
                        Hoặc
                      </p>
                      <div className="w-24 border-t"></div>
                    </div>
                    <button className="w-full h-8 border rounded flex items-center justify-center gap-3">
                      <div className="w-5 h-5">
                        <LogoGoogle />
                      </div>
                      <span className="font-semibold text-[#8c8c8c]">
                        Đăng nhập bằng Google
                      </span>
                    </button>
                    {errors.email && (
                      <div className="text-red-500 text-center mt-5">
                        <p>
                          Tên người dùng bạn đã nhập không thuộc về tài khoản.
                          Vui lòng kiểm tra tên người dùng của bạn và thử lại.
                        </p>
                        <p>
                          Đã xảy ra sự cố khi đăng nhập vào Instagram. Hãy thử
                          lại ngay.
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

              <div className="bg-white border rounded-xl p-3">
                <p className="my-3 text-center text-sm font-light space-x-2">
                  <span>Bạn chưa có tài khoản ư?</span>
                  <Link
                    to="/signup"
                    className="font-semibold text-[#007AFF] hover:underline"
                  >
                    Đăng ký
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HasFooterLayout>
  );
}

export default PageLogin;
