import { useRouter } from "next/router";
import { useUser } from "../../lib/hooks";
import { MdAccountCircle, MdKeyboardArrowRight } from "react-icons/md";

const Header = ({event}) => {
  const [user, { mutate }] = useUser();
  const router = useRouter();

  return (
    <div className="w-full flex justify-between h-[69px] border-b bg-white border-[#707070]">
      <div className="ml-[52px] flex justify-center items-center">
        <div className="text-3xl">Logo</div>
        <MdKeyboardArrowRight className="w-6 h-6 ml-3 mr-3" />
        <span className="text-xl text-[#6E84FF]">{event?.name}</span>
      </div>
      <div className="flex items-center h-full pr-4" onClick={() => router.replace('/setting')}>
        <MdAccountCircle color="#6E84FF" size={50} />
      </div>
    </div>
  );
};

export default Header;
