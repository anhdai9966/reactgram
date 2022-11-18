import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IconXmark } from "~/components/UI/Icons";

function GenderModal({ handle, defaultValue, setFalse }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      gender: `${defaultValue}`,
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    handle(data);
    setFalse();
  };

  const handleCloseModal = () => {
    setFalse();
  };

  const getGenderById = (id) => {
    const mapGender = [
      { id: 1, title: "Nam" },
      { id: 2, title: "Nữ" },
      { id: 3, title: "Không muốn tiết lộ" },
    ];
    const gd = mapGender.find((gender) => gender.id === id);
    return gd?.title || "Không muốn tiết lộ";
  };

  const genderList = useRef([
    {
      id: 0,
      title: "Nam",
      value: 1,
    },
    {
      id: 1,
      title: "Nữ",
      value: 2,
    },
    {
      id: 2,
      title: "Không muốn tiết lộ",
      value: 3,
    },
  ]);

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="w-96">
        <div className="relative px-3 py-1 border-b">
          <h3 className="text-center font-semibold">Giới tính</h3>
          <div className="absolute right-2 top-2">
            <button onClick={handleCloseModal} className="w-4 h-4">
              <IconXmark className="" />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4">
            {genderList.current.map((gender) => (
              <div key={gender.id}>
                <label className="space-x-2">
                  <input
                    type="radio"
                    value={gender.title}
                    {...register("gender")}
                  />
                  <span>{gender.title}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="p-4">
            <button className="w-full rounded-md bg-[#007AFF] px-4 py-2">
              <span className="text-white font-semibold text-sm">Xong</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GenderModal;
