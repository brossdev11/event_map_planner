import { BsGear } from "react-icons/bs";
import { FiPackage } from "react-icons/fi";
import { BiCalendarEvent } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCurrentUser } from "../../lib/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
const SideBar = () => {
  const router = useRouter();
  const [user ,{ mutate }] = useCurrentUser();
  const [events, setEvents] = useState([]);

  const logout = async () => {
    await axios.delete("/api/auth");
    mutate(null);
  };

  useEffect(() => {
    initialData();
  }, [])

  const initialData = () => {
    axios.get('/api/event').then(({data}) => {
      setEvents(data.events);
    })
  }

  return (
    <div className="w-[269px] h-[calc(100vh-90px)] bg-white pt-16 text-[#868686] absolute top-0 left-0">
      <div
        className="py-3 flex items-start px-10 cursor-pointer"
      >
        <Link href="/events">
          <BiCalendarEvent 
            className="w-7 h-7 mr-6" 
            style={{
              color: router.pathname === "/events" | router.pathname === "/create_event" ? "#6e84ff" : "#868686",
            }}
          />
        </Link>
        <div>
          <Link href="/events">
            <div className="text-lg font-medium"
              style={{
                color: router.pathname === "/events" ? "#6e84ff" : "#868686",
              }}
            >Events</div>
          </Link>
          <Link href="/create_event">
            <div 
              className="text-md font-medium"
              style={{
                color: router.pathname === "/create_event" ? "#6e84ff" : "#868686",
              }}
            >Create Event</div>
          </Link>
          { events && events.map((event, key) => (
            <Link href={`/event/${event._id}`} key={key}>
              <div 
                className="text-md font-medium"
                style={{
                  color: router.asPath === `/event/${event._id}` ? "#6e84ff" : "#868686",
                }}
              >{event.name}</div>
            </Link>
          ))}
        </div>
      </div>

      <Link href="/subscription">
        <div
          className="py-3 flex items-center px-10 cursor-pointer"
          style={{
            color: router.pathname === "/subscription" ? "#6e84ff" : "#868686",
          }}
        >
          <FiPackage className="w-7 h-7 mr-6" />
          <span className="text-lg font-medium">Subscription</span>
        </div>
      </Link>
      <Link href="/setting">
        <div
          className="py-3 flex items-center px-10 cursor-pointer"
          style={{
            color: router.pathname === "/setting" ? "#6e84ff" : "#868686",
          }}
        >
          <BsGear className="w-7 h-7 mr-6" />
          <span className="text-lg font-medium">Settings</span>
        </div>
      </Link>
      <div
        className="py-3 flex items-center px-10 cursor-pointer"
        style={{color: "#868686"}}
        onClick={() => logout()}
      >
        <FiLogOut className="w-7 h-7 mr-6" />
        <span className="text-lg font-medium">Log Out</span>
      </div>
    </div>
  );
};

export default SideBar;
