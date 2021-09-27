import { ImPlus } from "react-icons/im";
import Link from "next/link";

const Events = () => {
  return (
    <div className="w-full pt-20 pl-40 mx-auto text-gray-400">
      <div className="text[40px] font-bold mb-9">Your Events</div>
      <div className="w-full mb-7">
        <Link href="/create_event">
          <div className="w-[243px] h-[261px] bg-white rounded-t-lg cursor-pointer">
            <div className="flex justify-center">
              <ImPlus className="w-20 h-20 text-[#6E84FF] mt-7" />
            </div>
            <div className="text-[#6E84FF] text-[40px] w-full text-center mt-10">New</div>
          </div>
        </Link>
      </div>
      <div className="w-full flex gap-8">
        <div className="w-[243px] h-[261px] bg-white rounded-t-lg flex justify-center items-center flex-col">
          <div className="text-3xl w-full text-center">Cheese festival</div>
          <div className="text-xl mt-3 w-full text-center">London</div>
        </div>
        <div className="w-[243px] h-[261px] bg-white rounded-t-lg flex justify-center items-center flex-col">
          <div className="text-3xl w-full text-center">Music festival</div>
          <div className="text-xl mt-3 w-full text-center">London</div>
        </div>
      </div>
    </div>
  );
};

export default Events;
