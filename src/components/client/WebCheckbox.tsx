import { CheckIcon } from "@/icons/client/CheckIcon";
import { useState } from "react";

interface Props {
  value: string
  label: string
  checked: boolean
}

export const WebCheckbox: React.FC<Props> = ({ value, label, checked }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    setIsChecked(!isChecked);
  }

  return (
    <label aria-checked={isChecked} className="group flex items-center gap-2 p-3 w-fit h-fit font-medium cursor-pointer select-none">
      <div className="relative flex justify-center items-center">
        <input
          name="prefer-web"
          type="checkbox"
          defaultChecked={isChecked}
          onChange={handleChange}
          value={value}
          className="group-aria-checked:bg-c-old-gold border-2 border-c-steel-gray group-aria-checked:border-c-old-gold group-hover:border-c-old-gold rounded w-5 h-5 appearance-none"
        />
        <CheckIcon className="absolute group-aria-checked:stroke-c-snow-white w-4.5 h-4.5" />
      </div>
      {label}
    </label>
  )
}