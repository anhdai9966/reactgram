import Footer from "../../components/Footer";

function FooterLayout({ children }) {
  return (
    <div className="h-[var(--window-height)] bg-[#fafafa] relative overflow-y-auto scrollbar-gutter">
      <div className="container mx-auto h-full flex flex-col items-center justify-between">
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default FooterLayout;
