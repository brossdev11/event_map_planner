import SideBar from "./SideBar";
const MainLayout = ({ children }) => (
  <div className="w-full flex h-[calc(100vh-90px)] relative">
    <SideBar />
    <div className="w-full pl-[269px]">{children}</div>
  </div>
);

export default MainLayout;
