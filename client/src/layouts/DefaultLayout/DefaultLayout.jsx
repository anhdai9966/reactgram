import Header from "../components/Header";
import Modals from "../components/Modals";

function DefaultLayout({ children }) {
  return (
    <div dir="ltr" className="bg-[#fafafa] relative">
      <div className="grid grid-cols-1 sm:grid-cols-[73px_1fr] xl:grid-cols-[244px_1fr] relative h-[var(--window-height)] overflow-y-auto">
        <Header />

        <div className="h-fit min-h-[var(--window-height)] transition-all container w-full lg:max-w-[975px] mx-auto">
          <div className="h-full relative flex justify-center">{children}</div>
        </div>
      </div>
      <Modals />
    </div>
  );
}

export default DefaultLayout;
