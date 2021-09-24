import React, { useState, useEffect } from "react";
import { useUser } from "../lib/hooks";
import { useRouter } from "next/router";
import Button from "../components/common/Button";

export default function SignUp() {
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.replace("/events");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.currentTarget.password.value !== e.currentTarget.cpassword.value) {
      setErrorMsg("Passwords does not match");
    } else {
      const body = {
        email: e.currentTarget.email.value,
        name: e.currentTarget.name.value,
        password: e.currentTarget.password.value,
      };
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 201) {
        const userObj = await res.json();
        // writing our user object to the state
        mutate(userObj);
      } else {
        setErrorMsg(await res.text());
      }
    }
  };
  return (
    <div className="w-full">
      <div className="w-fulll sm:w-[500px] md:w-[750px] m-auto py-24 px-5">
        <form onSubmit={handleSubmit}>
          {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
          <div className="w-full mb-5">
            <label htmlFor="name" className="font-bold text-xl text-gray-400">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full bg-white rounded-full h-12 outline-none mt-2 px-5 text-lg"
              name="name"
              required
            />
          </div>
          <div className="w-full mb-5">
            <label htmlFor="email" className="font-bold text-xl text-gray-400">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="w-full bg-white rounded-full h-12 outline-none mt-2 px-5 text-lg"
              name="email"
              required
            />
          </div>
          <div className="w-full mb-5">
            <label
              htmlFor="password"
              className="font-bold text-xl text-gray-400"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full bg-white rounded-full h-12 outline-none mt-2 px-5 text-lg"
              name="password"
              required
            />
          </div>
          <div className="w-full mb-5">
            <label
              htmlFor="cpassword"
              className="font-bold text-xl text-gray-400"
            >
              Confirm Password
            </label>
            <input
              id="cpassword"
              type="password"
              className="w-full bg-white rounded-full h-12 outline-none mt-2 px-5 text-lg"
              name="cpassword"
              required
            />
          </div>
          <div className="col s12" style={{ marginBottom: "1rem" }}>
            <Button style="primary" type="submit">sign up</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
