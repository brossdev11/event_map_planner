import { useRouter } from "next/router";
import { useUser } from "../../lib/hooks";
import { MdAccountCircle } from "react-icons/md";
import Button from "../common/Button";

const Header = () => {
  const [user, { mutate }] = useUser();
  const router = useRouter();

  return (
    <div className="w-full flex justify-between h-[90px] border-b border-[#707070]">
      <div className="ml-[52px] w-32 text-3xl flex justify-center items-center">
        LOGO
      </div>
      {user ? (
        <div className="flex items-center h-14 my-auto px-4 bg-white rounded-full mr-7 cursor-pointer" onClick={() => router.replace('/setting')}>
          <div className="mr-10 text-[#868686] text-xl font-medium">{user.name}</div>
          <MdAccountCircle color="#6E84FF" size={50} />
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <Button onClick={() => { router.replace("signup")}} type="button" style="primary">
            Sign Up
          </Button>
          <Button onClick={() => { router.replace("login") }} type="button">
            LogIn
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
