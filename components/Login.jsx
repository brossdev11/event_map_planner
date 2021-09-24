import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../lib/hooks";
import Button from "../components/common/Button";

export default function Login() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [user, { mutate }] = useUser();
  const [loading, isLoading] = useState(false);
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.replace("/");
  }, [user]);

  async function onSubmit(e) {
    isLoading(true);
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      isLoading(false);
      setErrorMsg("Incorrect username or password. Try again!");
    }
  }

  return (
    <div className="w-full">
      <div className="w-fulll sm:w-[500px] md:w-[750px] m-auto py-24 px-5">
        <form onSubmit={onSubmit}>
          {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
          <div className="w-full mb-5">
            <label htmlFor="email" className="font-bold text-xl text-gray-400">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="w-full bg-white rounded-full h-12 outline-none mt-2 px-5 text-lg"
              name="name"
              required
            />
          </div>
          <div className="w-full mb-5">
            <label htmlFor="password" className="font-bold text-xl text-gray-400">Password</label>
            <input
              id="password"
              type="password"
              className="w-full bg-white rounded-full h-12 outline-none mt-2 px-5 text-lg"
              required
            />
          </div>
          <Button style="primary" type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
