import Login from "../components/Login";
import Header from "../components/Layout/Header";

export default function login() {
    return (
        <div className="w-full min-h-screen">
            <Header />
            <Login/>
        </div>
    );
}