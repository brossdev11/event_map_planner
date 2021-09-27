import { FaUserFriends, FaRoute, FaDrawPolygon, FaBuilding, FaShuttleVan } from "react-icons/fa";
import { BsFonts, BsGear } from "react-icons/bs";

const toolbars = [
    {
        label: 'Zones',
        icon: <FaDrawPolygon className="w-6 h-6" style={{ fontWeight: "bold" }} />,
    },
    {
        label: 'Personnel',
        icon: <FaUserFriends className="w-6 h-6" style={{ fontWeight: "bold" }} />,
    },
    {
        label: 'Objects',
        icon: <BsFonts className="w-6 h-6" style={{ fontWeight: "bold" }} />,
    },
    {
        label: 'Routes',
        icon: <FaRoute className="w-6 h-6" style={{ fontWeight: "bold" }} />,
    },
    {
        label: 'Labels',
        icon: <BsFonts className="w-6 h-6" style={{ fontWeight: "bold" }} />,
    },
    {
        label: 'Structures',
        icon: <FaBuilding className="w-6 h-6" style={{ fontWeight: "bold" }} />,
    },
    {
        label: 'Vehicles',
        icon: <FaShuttleVan className="w-6 h-6" style={{ fontWeight: "bold" }} />,
    },
]

const ToolBar = (props) => (
  <div className="absolute top-0 left-0 w-[72px] bg-white h-full flex justify-between flex-col z-10">
    <div className="w-full">
        {toolbars.map((tool, key) => (
            <div 
                className={`w-full h-[72px] flex flex-col flex-wrap items-center justify-center cursor-pointer ${props.selectedTool === tool.label ? 'bg-[#F8F8F8] rounded-tl-2xl rounded-bl-2xl' : ''}`} 
                key={key} 
                onClick={() => props.selectTool(tool.label)}
            >
                {tool.icon}
                <div className="w-full text-center">{tool.label}</div>
            </div>
        ))}
    </div>
    <div className="w-full h-[72px] flex flex-col flex-wrap items-center justify-center cursor-pointer">
      <BsGear className="w-6 h-6" style={{ fontWeight: "bold" }} />
      <div className="w-full text-center">Settings</div>
    </div>
  </div>
);

export default ToolBar;
