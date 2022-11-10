import { IconBellCircle, IconHeartCircle } from "~/components/UI/Icons";

function NotificationDrop() {
  return (
    <div>
      <div className="px-4 py-6 flex flex-col gap-8">
        <h2 className="font-semibold text-xl">Thông báo</h2>
        <div>
          <div className="py-4">
            <IconBellCircle className="w-12 h-12 mx-auto text-[#8c8c8c]" />
          </div>
          <div className="space-y-2 text-center text-sm font-light">
            <p>Hoạt động trên bài viết của bạn</p>
            <p>
              Khi có người thích hoặc bình luận về một trong những bài viết của
              bạn, bạn sẽ nhìn thấy nó ở đây.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationDrop;
