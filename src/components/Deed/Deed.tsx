import "./Deed.css";
import { ChangeEvent } from "react";

interface DeedProps {
  deed: { name: string; checked: boolean; id: string };
  handleCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
}

function Deed({ deed, handleCheck }: DeedProps) {
  return (
    <label className="deed">
      <span className="deed__checkbox-custom" />
      <p className="deed__title">{deed.name}</p>
      <input
        className="deed__checkbox"
        checked={deed.checked}
        onChange={(e) => handleCheck(e, deed.id)}
        type="checkbox"
      />
    </label>
  );
}

export default Deed;
