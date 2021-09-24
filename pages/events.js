import SideBar from "../components/Layout/SideBar";
import Header from "../components/Layout/Header";
import Events from "../components/Events";
import { useCurrentUser } from "../lib/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from '../components/Layout/MainLayout';

export default function events() {

    const [user] = useCurrentUser();
    const router = useRouter();
    useEffect(() => {
        if(!user) {
            router.replace('/login');
        }
    }, [user])

    return (
        <div className="w-full min-h-screen">
            <Header />
            <MainLayout>
                <Events />
            </MainLayout>
        </div>
    );
}