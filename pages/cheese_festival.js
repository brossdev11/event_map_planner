import Header from "../components/Layout/Header";
import MainLayout from '../components/Layout/MainLayout';
import CheeseFestival from '../components/CheeseFestival';

export default function cheese_festival() {
    return (
        <div className="w-full min-h-screen">
            <Header />
            <MainLayout>
                <CheeseFestival />
            </MainLayout>
        </div>
    );
}