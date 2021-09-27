import { useRef, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
const Zones = (props) => {
  const [color, setColor] = useState("#31FF00");
  const nameRef = useRef();

  const changeColor = (value) => {
    const _color = value.slice(0, 7) + "80";
    setColor(value);
  };

  const addPolygon = () => {
    props.submit({
      type: "polygon",
      name: nameRef.current.value,
      color: color,
    });
  };

  return (
    <div className="w-full py-5 px-4">
      <div className="flex justify-between items-center mb-[18px]">
        <div className="text-xl font-bold">Zones</div>
        <AiFillEye className="w-5 h-6 cursor-pointer" />
      </div>
      <div className="w-full flex items-center rounded-lg bg-white h-8 pl-[6px]">
        <label
          htmlFor="fill-color"
          className="w-4 h-4 rounded-full"
          style={{ background: color }}
        ></label>
        <input
          type="text"
          id="title"
          ref={nameRef}
          className="flex-1 outline-none h-8 px-2"
        />
        <button
          className="w-8 h-8 text-white outline-none bg-[#6E84FF] flex items-center justify-center rounded-r-lg"
          onClick={() => addPolygon()}
        >
          <HiPlus className="w-6 h-6" />
        </button>
        <input
          type="color"
          id="fill-color"
          value={color}
          onChange={(e) => changeColor(e.target.value)}
          hidden
        />
      </div>
    </div>
  );
};

export default Zones;
