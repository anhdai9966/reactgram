import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LogoReactgram } from "~/components/UI/Logos";
import images from "~/assets/images";
import FooterLayout from "~/layouts/FooterLayout";
import { useDocumentTitle } from "~/hooks";
import {
  fetchUser,
  setLoadingAccount,
  setLoggedMessages,
} from "~/app/accountSlice";
import { IconSpinner8SpinsWhite } from "~/components/UI/Icons";
import { motion } from "framer-motion";
import LoginWithGoogle from "~/components/LoginWithGoogle";
import Or from "~/components/Or";
import AnimateUpLayout from "~/layouts/AnimateUpLayout";
import { isEmpty } from "~/utils";
import { authentication } from "~/services";

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
    const { email, password, isChecked } = data;
    try {
      dispatch(setLoadingAccount(true));
      const res = await authentication.login(email, password, isChecked);

      dispatch(fetchUser(res.user.uid));
    } catch (error) {
      dispatch(setLoggedMessages(error.code));
    }
    dispatch(setLoadingAccount(false));
  };

  const valueAllField = !watch("email") || !watch("password");

  return (
    <FooterLayout>
      <AnimateUpLayout className="flex justify-center my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-96 bg-[#f0cdd8] hidden lg:block rounded-xl overflow-hidden relative">
            <img src={images.signin} alt="signin" />
            <p className="text-[#6e4452] text-xs font-light absolute bottom-6 left-8">
              Tác phẩm của{" "}
              <a
                href="https://dribbble.com/karicca"
                target="blank"
                className="underline"
              >
                Irina Valeeva
              </a>
            </p>
          </div>
          <div className="w-full sm:w-96 space-y-3">
            <div className="bg-white border rounded-xl">
              <div className="mt-11 mb-3">
                <LogoReactgram className="h-12 w-44 mx-auto text-[#333]" />
              </div>
              <div className="p-6 text-sm font-light">
                <div className="w-[270px] mx-auto">
                  <form
                    className="grid grid-cols-1 grid-rows-4 gap-3"
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
                        style={{
                          borderColor:
                            isLoggedMessage === "auth/user-not-found"
                              ? "#FF3B30"
                              : "#d1d5db",
                        }}
                        className="relative outline-none border border-gray-300 rounded bg-black/5 h-8 px-2 pt-1 w-full"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            // value:
                            //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                        style={{
                          borderColor:
                            isLoggedMessage === "auth/wrong-password"
                              ? "#FF3B30"
                              : "#d1d5db",
                        }}
                        className="relative outline-none border border-gray-300 rounded bg-black/5 h-8 px-2 pt-1  w-full"
                      />
                    </div>
                    <label className="w-fit flex gap-2 items-center ml-1 cursor-pointer">
                      <input type="checkbox" {...register("isChecked")} />
                      <span className="text-xs">Lưu thông tin đăng nhập</span>
                    </label>
                    <button
                      disabled={valueAllField}
                      className={`h-8 border rounded bg-[#0095f6] hover:disabled:cursor-not-allowed ${
                        valueAllField && "opacity-50"
                      }`}
                    >
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
                  <div className="">
                    <Or />
                  </div>
                  <div className="">
                    <LoginWithGoogle />
                  </div>
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
                      {isLoggedMessage === "auth/user-not-found" && (
                        <p>
                          Email bạn đã nhập không thuộc về tài khoản nào. Vui
                          lòng kiểm tra email của bạn và thử lại.
                        </p>
                      )}
                      {isLoggedMessage === "auth/wrong-password" && (
                        <p>
                          Đã xảy ra sự cố khi đăng nhập vào Instagram. Hãy kiểm
                          tra lại mật khẩu.
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
                  to="/accounts/emailsignup"
                  className="font-semibold text-[#007AFF] hover:underline"
                >
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AnimateUpLayout>
    </FooterLayout>
  );
}

export default PageLogin;
