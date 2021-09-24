import Header from "../components/Layout/Header";
import Subscription from "../components/Subscription";
import MainLayout from '../components/Layout/MainLayout';
import { useCurrentUser } from "../lib/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function subscription() {

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
                <Subscription />
            </MainLayout>
        </div>
    );
}