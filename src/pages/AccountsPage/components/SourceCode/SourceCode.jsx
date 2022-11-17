import { LogoCdai } from "~/components/UI/Logos";

function SourceCode() {
  return (
    <div className="py-4 pl-7 pr-4 space-y-2 shrink-0">
      <a
        href="https://github.com/anhdai9966/reactgram"
        target="blank"
        className="block"
      >
        <LogoCdai className="h-5 w-12" />
      </a>
      <a
        href="https://github.com/anhdai9966/reactgram"
        target="blank"
        className="text-[#007AFF] block text-sm"
      >
        Code Source
      </a>
      <p className="text-xs text-[#8c8c8c] font-light">Logo by dailai9966</p>
    </div>
  );
}

export default SourceCode;
