import images from "~/assets/images"
import { IconSpinner12Spins } from "../UI/Icons"

function LoadingScreen() {
  
  return (
    <div className="relative h-[var(--window-height)] flex flex-col gap-3 justify-center items-center">
        <div className="w-12 h-12">
          <img src={images.logoInstargram} alt="logo" />
        </div>
        <p className="text-xs font-light text-center">
          Reactgram <br /> by dailai9966
        </p>
        <div className="absolute top-3/4 left-1/2 -translate-x-1/2">
          <IconSpinner12Spins className="w-6 h-6 animate-spinner12Spins" />
        </div>
      </div>
  )
}

export default LoadingScreen