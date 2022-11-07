function Footer() {
  return (
    <footer className="pt-6 pb-10 border-t mt-6 w-full">
      <div className="flex flex-col gap-3">
        <ul className="text-center text-xs text-[#8e8e8e] font-light flex justify-center gap-4">
          <li>Giới thiệu</li>
          <li>Blog</li>
          <li>API</li>
          <li>Quyền riêng tư</li>
        </ul>
        <div className="text-center text-xs text-[#8e8e8e] font-light">&copy; 2022 Reactgram from dailai9966</div>
      </div>
    </footer>
  );
}

export default Footer;
