import Header from "../components/Layout/Header";
import MainLayout from '../components/Layout/MainLayout';
import CreateEvent from '../components/CreateEvent';

export default function create_event() {
    return (
        <div className="w-full min-h-screen">
            <Header />
            <MainLayout>
                <CreateEvent />
            </MainLayout>
        </div>
    );
}