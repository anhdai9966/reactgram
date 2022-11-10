import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LogoGoogle, LogoReactgram } from "~/components/UI/Logos";
import images from "~/assets/images";
import FooterLayout from "~/layouts/FooterLayout";
import { useDocumentTitle } from "~/hooks";
import { accountLogin, accountloginWithGoogle } from "~/app/accountSlice";
import { IconSpinner8SpinsWhite } from "~/components/UI/Icons";
import { motion } from "framer-motion";
import { isEmpty } from "@firebase/util";

function PageLogin() {
  useDocumentTitle("Reactgram");
  const dispatch = useDispatch();
  const { isLoadingAccount, isLoggedMessage } = useSelector(
    (state) => state.account
  );
  // auth/wrong-password
  // auth/user-not-found
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(accountLogin(data));
  };

  const handleLoginWithGoogle = async () => {
    dispatch(accountloginWithGoogle());
  };

  return (
    <FooterLayout>
      <motion.div
        initial={{ y: "100px", opacity: 0 }}
        animate={{ y: "0", opacity: 1 }}
        exit={{ y: "100px", opacity: 0 }}
        transition={{duration: .3}}
        className="flex justify-center my-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-96 bg-[#f0cdd8] hidden lg:block rounded-xl overflow-hidden">
            <img src={images.signin} alt="signin" />
          </div>
          <div className="w-full sm:w-96 space-y-3">
            <div className="bg-white border rounded-xl">
              <div className="mt-11 mb-3">
                <LogoReactgram className="h-12 w-44 mx-auto text-[#333]" />
              </div>
              <div className="p-6 text-sm font-light">
                <div className="w-[270px] mx-auto">
                  <form
                    className="grid grid-cols-1 grid-rows-4 gap-2"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="relative text-xs">
                      <label
                        htmlFor="emailInput"
                        className={`absolute top-2 left-2 text-[#8c8c8c] cursor-auto transition-transform origin-top-left ${
                          !!watch("email")
                            ? "scale-[.8] -translate-y-2"
                            : "scale-100"
                        }`}
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="emailInput"
                        className={`${
                          isLoggedMessage.includes("user") && "border-[#FF3B30]"
                        } relative outline-none border border-gray-300 rounded bg-black/5 h-8 px-2 pt-1 w-full`}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Bạn phải nhập đúng email",
                          },
                        })}
                      />
                    </div>
                    <div className="relative text-xs">
                      <label
                        htmlFor="passwordInput"
                        className={`absolute top-2 left-2 text-[#8c8c8c] cursor-auto transition-transform origin-top-left ${
                          !!watch("password")
                            ? "scale-[.8] -translate-y-2"
                            : "scale-100"
                        }`}
                      >
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        {...register("password", {
                          required: true,
                          minLength: {
                            value: 6,
                            message: "Bạn phải nhập ít nhất 6 ký tự",
                          },
                        })}
                        id="passwordInput"
                        className={`${
                          isLoggedMessage.includes("password") &&
                          "border-[#FF3B30]"
                        } relative outline-none border border-gray-300 rounded bg-black/5 h-8 px-2 pt-1  w-full`}
                      />
                    </div>
                    <label className="w-fit flex gap-2 items-center ml-1 cursor-pointer">
                      <input type="checkbox" {...register("isChecked")} />
                      <span className="text-xs">Lưu thông tin đăng nhập</span>
                    </label>
                    <button disabled={!watch('email') || !watch('password')} className="h-8 border rounded bg-[#0095f6] hover:disabled:cursor-not-allowed">
                      {isLoadingAccount && (
                        <div className="w-4 h-4 mx-auto">
                          <IconSpinner8SpinsWhite className="text-white animate-spinner12Spins" />
                        </div>
                      )}
                      {!isLoadingAccount && (
                        <span className="text-white font-semibold">
                          Đăng nhập
                        </span>
                      )}
                    </button>
                  </form>
                  <div className="flex justify-evenly items-center py-4">
                    <div className="w-24 border-t"></div>
                    <p className="uppercase text-xs font-semibold text-[#8c8c8c]">
                      Hoặc
                    </p>
                    <div className="w-24 border-t"></div>
                  </div>
                  <button
                    onClick={handleLoginWithGoogle}
                    className="w-full h-8 rounded flex items-center justify-center gap-3 hover:bg-black/[3%]"
                  >
                    <div className="w-5 h-5">
                      <LogoGoogle />
                    </div>
                    <span className="font-semibold text-[#8c8c8c]">
                      Đăng nhập bằng Google
                    </span>
                  </button>
                  {!isEmpty(errors) && (
                    <motion.div
                      initial={{ y: "-50%", opacity: 0 }}
                      animate={{ y: "0", opacity: 1 }}
                      exit={{ y: "50%", opacity: 0 }}
                      className="text-red-500 text-center mt-5"
                    >
                      <p>{errors?.email?.message}</p>
                      <p>{errors?.password?.message}</p>
                    </motion.div>
                  )}
                  {!!isLoggedMessage && (
                    <motion.div
                      initial={{ y: "-50%", opacity: 0 }}
                      animate={{ y: "0", opacity: 1 }}
                      exit={{ y: "50%", opacity: 0 }}
                      className="text-red-500 text-center mt-5"
                    >
                      {isLoggedMessage.includes("password") && (
                        <p>
                          Đã xảy ra sự cố khi đăng nhập vào Instagram. Hãy kiểm
                          tra lại mật khẩu.
                        </p>
                      )}
                      {isLoggedMessage.includes("user") && (
                        <p>
                          Email bạn đã nhập không thuộc về tài khoản nào. Vui lòng
                          kiểm tra email của bạn và thử lại.
                        </p>
                      )}
                    </motion.div>
                  )}
                  <div className="text-center mt-5">
                    <Link to="/" className="text-xs hover:underline">
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
      </motion.div>
    </FooterLayout>
  );
}

export default PageLogin;
