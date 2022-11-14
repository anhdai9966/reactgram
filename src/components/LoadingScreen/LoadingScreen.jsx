import images from "~/assets/images";
import { IconSpinner12Spins } from "../UI/Icons";

function LoadingScreen() {
  return (
    <div className="relative h-[var(--window-height)] flex flex-col gap-3 justify-center items-center">
      <div className="w-12 h-12">
        <img src={images.logoInstargram} alt="logo" />
      </div>

      <div className="absolute bottom-9 left-1/2 -translate-x-1/2">
        <div className="space-y-4">
          <IconSpinner12Spins className="w-6 h-6 mx-auto animate-spinner12Spins" />
          <p className="text-xs font-light text-center">
            Reactgram <br /> by dailai9966
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
