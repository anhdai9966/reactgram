import { IconError } from "~/components/UI/Icons";

function ErrorPage() {
  return (
    <div className="w-full h-full flex gap-3 justify-center flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-14 h-14 mx-auto">
        <IconError />
      </div>
      <h1 className="text-center font-light text-gray-500">Lỗi</h1>
      <p className="text-center max-w-xs mx-auto font-light text-gray-500">
        Trang bạn tìm không tồn tại hoặc trang đã bị gỡ ra khỏi hệ thống!
      </p>
    </div>
  );
}

export default ErrorPage;
