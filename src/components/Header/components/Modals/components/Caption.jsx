import { useState } from "react";
import { forwardRef } from "react";
import Emoji from "~/components/Emoji";
import { IconEmoji } from "~/components/UI/Icons";
import { LENGHT_CAPTION } from "~/configs";
import { useBoolean, useOnClickOutside } from "~/hooks";
import DropLayout from "~/layouts/DropLayout";

const Caption = forwardRef((props, ref) => {
  const [enteredCaption, setEnteredCaption] = useState("");

  const handleSetCaption = (value) => {
    if (value.length > LENGHT_CAPTION) return;
    setEnteredCaption(value);
  };

  const handleChangeCaptionTextarea = (ev) => {
    handleSetCaption(ev.target.value);
  };

  const handleClickEmoji = (emoji) => {
    handleSetCaption((enteredCaption) => `${enteredCaption}${emoji}`);
  };

  const {
    state: isShowEmojiDrop,
    toggle: toggleEmojiDrop,
    setFalse: closeEmojiDrop,
  } = useBoolean();

  const emojiRef = useOnClickOutside(() => {
    closeEmojiDrop();
  });

  const handleClickEmojiIcon = () => {
    toggleEmojiDrop();
  };

  return (
    <div className="">
      <textarea
        name="caption"
        cols="30"
        rows="6"
        placeholder="Viết chú thích..."
        className="outline-none resize-none"
        value={enteredCaption}
        onChange={handleChangeCaptionTextarea}
        ref={ref}
      ></textarea>
      <div className="h-11 flex items-center justify-between text-[#8c8c8c] text-xs">
        <div ref={emojiRef} className="relative w-5 h-5">
          <button onClick={handleClickEmojiIcon} className="w-5 h-5">
            <IconEmoji />
          </button>
          <DropLayout isShow={isShowEmojiDrop} isShowDown={true}>
            <div className="w-72 h-40">
              <Emoji handleClick={handleClickEmoji} />
            </div>
          </DropLayout>
        </div>
        <div
          className={`opacity-50 ${
            enteredCaption.length === LENGHT_CAPTION &&
            "text-[#FF3B30] opacity-100"
          }`}
        >
          {enteredCaption.length}/{LENGHT_CAPTION.toLocaleString()}
        </div>
      </div>
    </div>
  );
});

export default Caption;
