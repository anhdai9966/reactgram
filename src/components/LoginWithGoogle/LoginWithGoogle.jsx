import { useDispatch } from "react-redux";
import { accountloginWithGoogle } from "~/app/accountSlice";
import { LogoGoogle } from "~/components/UI/Logos";

function LoginWithGoogle({ className }) {
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    dispatch(accountloginWithGoogle());
  };

  return (
    <button
      onClick={handleLoginWithGoogle}
      className={`w-full h-8 rounded flex items-center justify-center gap-3 hover:bg-black/[3%] ${className}`}
    >
      <div className="w-5 h-5">
        <LogoGoogle />
      </div>
      <span className="font-semibold text-[#8c8c8c]">
        Đăng nhập bằng Google
      </span>
    </button>
  );
}

export default LoginWithGoogle;
