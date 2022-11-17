import { IconBellCircle } from "~/components/UI/Icons";
import AnimateUpLayout from "~/layouts/AnimateUpLayout";
import NotificationItem from "./components/NotificationItem";

function NotificationDrop() {
  return (
    <AnimateUpLayout delay={0.1}>
      <div className="">
        <h2 className="font-semibold text-xl px-4 py-6">Thông báo</h2>
        <div className="">
          <h3 className="px-4">Hôm nay</h3>
          <NotificationItem />
        </div>
        <div className="px-4">
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
    </AnimateUpLayout>
  );
}

export default NotificationDrop;
