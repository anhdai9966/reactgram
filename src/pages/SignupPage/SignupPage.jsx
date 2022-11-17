import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LoginWithGoogle from "~/components/LoginWithGoogle";
import Or from "~/components/Or";
import { IconSpinner8SpinsWhite } from "~/components/UI/Icons";
import { LogoReactgram } from "~/components/UI/Logos";
import AnimateUpLayout from "~/layouts/AnimateUpLayout";
import FooterLayout from "~/layouts/FooterLayout";
import { motion } from "framer-motion";
import { isEmpty } from "~/utils";
import { logout, signup } from "~/services/authenticationService";
import users from "~/services/usersService";
import { useState } from "react";

function SignupPage() {
  const navigate = useNavigate();
  const [isLoadingCteateUser, setIsLoadingCreateUser] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoadingCreateUser(true);
      // sign up with email and password
      const resUser = await signup(data.email, data.password);
      // create user to upload info user firestore
      await logout()
      const userData = {
        ...resUser.user,
        username: data.username,
        displayName: data.full_name,
      };
      await users.createUser(userData);
      navigate("/accounts/login");
    } catch (error) {
      // auth/email-already-in-use
      console.log(error.code);
    }
    setIsLoadingCreateUser(false);
  };

  const valueAllField =
    !watch("email") ||
    !watch("password") ||
    !watch("username") ||
    !watch("full_name");

  return (
    <FooterLayout>
      <AnimateUpLayout>
        <div className="space-y-5 mt-9 mb-9">
          <div className="border bg-white rounded-lg w-96 mx-auto p-9 space-y-2">
            <div className="space-y-3">
              <div className="mt-9 mb-3">
                <LogoReactgram className="h-12" />
              </div>
              <h1 className="text-center text-sm text-[#8c8c8c] font-light">
                Đăng ký để xem ảnh từ bạn bè.
              </h1>
              <div className="">
                <LoginWithGoogle className="bg-black/5" />
              </div>
              <div className="">
                <Or />
              </div>
            </div>
            <div className="mx-auto">
              <form
                className="text-sm font-light space-y-3"
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
                    className={`relative outline-none border border-gray-300 rounded bg-black/5 h-8 px-2 w-full ${
                      !!watch("email") && "pt-1"
                    }`}
                    {...register("email", {
                      required: "Bạn phải nhập email",
                      pattern: {
                        // value:
                        //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Bạn phải nhập đúng email",
                      },
                    })}
                  />
                </div>
                <div className="relative text-xs">
                  <label
                    htmlFor="fullNameInput"
                    className={`absolute top-2 left-2 text-[#8c8c8c] cursor-auto transition-transform origin-top-left ${
                      !!watch("full_name")
                        ? "scale-[.8] -translate-y-2"
                        : "scale-100"
                    }`}
                  >
                    Tên đầy đủ
                  </label>
                  <input
                    type="text"
                    {...register("full_name", {
                      required: true,
                    })}
                    id="fullNameInput"
                    className={`relative outline-none border border-gray-300 rounded bg-black/5 h-8 px-2 w-full ${
                      !!watch("full_name") && "pt-1"
                    }`}
                  />
                </div>
                <div className="relative text-xs">
                  <label
                    htmlFor="usernameInput"
                    className={`absolute top-2 left-2 text-[#8c8c8c] cursor-auto transition-transform origin-top-left ${
                      !!watch("username")
                        ? "scale-[.8] -translate-y-2"
                        : "scale-100"
                    }`}
                  >
                    Tên người dùng
                  </label>
                  <input
                    type="text"
                    {...register("username", {
                      required: true,
                    })}
                    id="usernameInput"
                    className={`relative outline-none border border-gray-300 rounded bg-black/5 h-8 px-2 w-full ${
                      !!watch("username") && "pt-1"
                    }`}
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
                    className={`relative outline-none border border-gray-300 rounded bg-black/5 h-8 px-2 w-full ${
                      !!watch("password") && "pt-1"
                    }`}
                  />
                </div>
                <div className="space-y-5">
                  <div className="font-light text-xs text-[#8c8c8c] text-center">
                    <p>
                      Những người dùng dịch vụ của chúng tôi có thể đã tải thông
                      tin liên hệ của bạn lên Reactgram
                    </p>
                  </div>
                  <div className="font-light text-xs text-[#8c8c8c] text-center">
                    <p>
                      Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách
                      quyền riêng tư của chúng tôi.
                    </p>
                  </div>
                </div>
                <div className="">
                  <button
                    disabled={valueAllField}
                    className={`h-8 w-full border rounded bg-[#0095f6] hover:disabled:cursor-not-allowed ${
                      valueAllField && "opacity-50"
                    }`}
                  >
                    {isLoadingCteateUser && (
                      <div className="w-4 h-4 mx-auto">
                        <IconSpinner8SpinsWhite className="text-white animate-spinner12Spins" />
                      </div>
                    )}
                    {!isLoadingCteateUser && (
                      <span className="text-white font-semibold">Đăng ký</span>
                    )}
                  </button>
                </div>
              </form>
              <div className="">
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
              </div>
            </div>
          </div>

          <div className="border bg-white rounded-lg w-96 mx-auto px-9 py-6">
            <p className="text-center font-light text-sm">
              Bạn có tài khoản?{" "}
              <Link
                to="/accounts/login"
                className="text-[#007AFF] font-semibold hover:underline"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </AnimateUpLayout>
    </FooterLayout>
  );
}

export default SignupPage;
