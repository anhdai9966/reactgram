import { useCallback } from "react";
import emojiData from "~/assets/data/emoji";

function Emoji({ setFalse }) {
  const handleClickEmoji = useCallback((emoji) => {
    console.log(emoji);
    setFalse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white border rounded-lg shadow-2xl py-3 w-full h-full">
      <div className="w-full h-full overflow-y-auto">
        <h5 className="font-semibold text-[#767680]/60 border-b py-2 px-5">
          Smileys & Emotion
        </h5>
        <ul className="flex flex-wrap gap-2 text-3xl p-3">
          {emojiData.map((emoji, index) => (
            <li
              key={index}
              className="w-fit h-fit hover:scale-105 transition-transform"
            >
              <button onClick={() => handleClickEmoji(emoji)}>{emoji}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Emoji;
