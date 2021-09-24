import Header from "../components/Layout/Header";
import Setting from '../components/Setting';
import MainLayout from '../components/Layout/MainLayout';

export default function setting() {
    return (
        <div className="w-full min-h-screen">
            <Header />
            <MainLayout>
                <Setting />
            </MainLayout>
        </div>
    );
}