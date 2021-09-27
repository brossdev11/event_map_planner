import { MdKeyboardArrowLeft } from "react-icons/md";

const ToolContainer = ({ children, visible, closeToolbar }) => (
  <div
    className="absolute w-[254px] top-0 left-[72px] bg-[#F8F8F8] h-full z-20"
    hidden={!visible}
  >
    {children}
    <div 
      className="absolute flex-col justify-center items-center top-1/2 -right-2 cursor-pointer rounded-lg bg-[#F8F8F8]"
      onClick={() => closeToolbar()}
    >
        <MdKeyboardArrowLeft className="w-5 h-7" />
    </div>
    <div id="panel" hidden>
      <div>
        <button id="delete-button">Delete Selected Shape</button>
        <button id="p-button">Custom</button>
      </div>
    </div>
  </div>
);

export default ToolContainer;
