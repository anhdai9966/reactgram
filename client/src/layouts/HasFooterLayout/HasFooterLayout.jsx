import Footer from "../components/Footer";

function HasFooterLayout({ children }) {
  return (
    <div className="h-[var(--window-height)] bg-[#fafafa] relative flex flex-col items-center justify-between">
      {children}
      <Footer />
    </div>
  );
}

export default HasFooterLayout;
