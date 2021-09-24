import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Button from "../components/common/Button";
import { useCurrentUser } from "../lib/hooks";

const CheeseFestival = () => {
  const [user] = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
      if(!user) {
            router.replace('/login');
      }
  }, [user]);
  return (
    <div className="w-full pt-20 pl-40 mx-auto text-gray-400">
      <div className="w-full text-gray-400 text-[40px] font-bold mb-20">
        Create Event
      </div>
      <div className="w-[550px]">
        <div className="w-full mb-5">
          <label htmlFor="name" className="font-bold text-xl text-gray-400">
            Name
          </label>
          <div className="w-full flex items-center mt-2">
            <input id="name" type="text" defaultValue="Cheese festival" className="w-full bg-white rounded-full h-12 outline-none px-5 text-lg" name="name" required/>
            <Button
              type="button"
              style="primary"
              className="ml-14"
              onClick={() => handleChangeName()}
            >
              Change
            </Button>
          </div>
        </div>
        <div className="w-full mb-5">
          <label htmlFor="location" className="font-bold text-xl text-gray-400">
            Location
          </label>
          <div className="w-full flex items-center mt-2">
            <input id="location" type="text" defaultValue="The field, SE1 23A" className="w-full bg-white rounded-full h-12 outline-none px-5 text-lg" name="location" required/>
            <Button
              type="button"
              style="primary"
              className="ml-14"
              onClick={() => handleChangeName()}
            >
              Change
            </Button>
          </div>
        </div>
        <div className="w-full flex items-center mt-20">
          <div className="font-bold text-xl text-gray-400 mr-10">Go to planner</div>
          <Button
            type="button"
            style="primary"
          >
            Planner
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CheeseFestival;
