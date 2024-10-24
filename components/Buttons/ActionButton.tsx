import RepeatIcon from "~/assets/icons/repeat.svg";
import ArrowDownIcon from "~/assets/icons/arrow-down.svg";

export const ActionButton: React.FC<{
  showRegenerate?: boolean;
  onInsert: () => void;
  onRegenerate?: () => void;
}> = ({ showRegenerate, onInsert, onRegenerate }) => (
  <div className="flex gap-[26px] justify-end">
    <button
      onClick={onInsert}
      className="flex w-fit gap-[12px] border border-[#666D80] text-[#666D80] py-[12px] px-[24px] rounded-[15px] text-[24px] items-center"
    >
      <img src={ArrowDownIcon} alt="arrow" /> Insert
    </button>

    {showRegenerate && (
      <button
        onClick={onRegenerate}
        className="text-white flex w-fit gap-[16px] bg-[#3B82F6] py-[12px] px-[24px] rounded-[15px] text-[24px] cursor-default items-center"
      >
        <img src={RepeatIcon} alt="repeat" /> Regenerate
      </button>
    )}
  </div>
);
