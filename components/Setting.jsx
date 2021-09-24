import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import Button from "../components/common/Button";
import { useCurrentUser } from "../lib/hooks";
import { store } from "react-notifications-component";

const Setting = () => {
  const [user, { mutate }] = useCurrentUser();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const router = useRouter();

  useEffect(() => {
      if(user) {
          if (nameRef) {
              nameRef.current.value = user.name;
          }
          if (emailRef) {
              emailRef.current.value = user.email;
          }
      } else {
            router.replace('/login');
      }
  }, [user]);

  const handleChangeName = async () => {
    const formData = new FormData();
    formData.append('name', nameRef.current.value);
    const res = await axios.patch('/api/user', formData);
    if (res.status === 200) {
        const userData = res;
        mutate({
            user: {
                ...user,
                ...userData.user,
            },
        });
        store.addNotification({
          title: '',
          message: 'Successfully update the name',
          type: 'success',
          insert: "top",
          container: "top-center",
          dismiss: {
            duration: 4000,
          },
        });
    }
  };

  const handleChangeEmail = async () => {
    if(emailRef.current.value){
          await axios.put("/api/user/email", {email: emailRef.current.value}).then(() => {
            store.addNotification({
              title: '',
              message: 'Successfully update the email',
              type: 'success',
              insert: "top",
              container: "top-center",
              dismiss: {
                duration: 4000,
              },
            });
          }).catch((e) => {
            store.addNotification({
              title: '',
              message: e.response.data,
              type: 'danger',
              insert: "top",
              container: "top-center",
              dismiss: {
                duration: 4000,
              },
            });
          });
    }
  };

  const handlePasswordChange = async () => {
      if(passwordRef.current.value === confirmPasswordRef.current.value){
            await axios.put("/api/user/password", {password: passwordRef.current.value}).then(() => {
                store.addNotification({
                  title: '',
                  message: 'Successfully update the password',
                  type: 'success',
                  insert: "top",
                  container: "top-center",
                  dismiss: {
                    duration: 4000,
                  },
                });
            }).catch((e) => {
                store.addNotification({
                  title: '',
                  message: e.response.data,
                  type: 'danger',
                  insert: "top",
                  container: "top-center",
                  dismiss: {
                    duration: 4000,
                  },
                });
            });
      }
  };

  return (
    <div className="w-full pt-20 pl-40 mx-auto text-gray-400">
      <div className="w-full text-gray-400 text-[40px] font-bold mb-20">
        Your settings
      </div>
      <div className="w-[550px]">
        <div className="w-full mb-5">
          <label htmlFor="name" className="font-bold text-xl text-gray-400">
            Name
          </label>
          <div className="w-full flex items-center mt-2">
            <input id="name" type="text" ref={nameRef} className="w-full bg-white rounded-full h-12 outline-none px-5 text-lg" name="name" required/>
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
          <label htmlFor="email" className="font-bold text-xl text-gray-400">
            Email
          </label>
          <div className="w-full flex items-center mt-2">
            <input id="email" type="text" ref={emailRef} className="w-full bg-white rounded-full h-12 outline-none px-5 text-lg" name="email" required/>
            <Button
              type="button"
              style="primary"
              className="ml-14"
              onClick={() => handleChangeEmail()}
            >
              Change
            </Button>
          </div>
        </div>
        <div className="w-full flex">
            <div className="w-full">
              <div className="w-full mb-5">
                  <label htmlFor="password" className="font-bold text-xl text-gray-400">
                      Change Password
                  </label>
                  <div className="w-full flex items-center mt-2">
                  <input id="password" ref={passwordRef} type="password" className="w-full bg-white rounded-full h-12 outline-none px-5 text-lg" name="password" required/>
                  </div>
              </div>
              <div className="w-full">
                  <label htmlFor="confirm_password" className="font-bold text-xl text-gray-400">
                      Confirm Password
                  </label>
                  <div className="w-full flex items-center mt-2">
                  <input id="confirm_password" ref={confirmPasswordRef} type="password" className="w-full bg-white rounded-full h-12 outline-none px-5 text-lg" name="confirm_password" required/>
                  </div>
              </div>
            </div>
          <div className="flex flex-col-reverse">
            <Button
              type="button"
              style="primary"
              className="ml-14"
              onClick={() => handlePasswordChange()}
            >
              Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Setting;
