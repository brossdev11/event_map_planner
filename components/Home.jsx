import { useUser } from '../lib/hooks';
import Header from '../components/Layout/Header';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const [user] = useUser();
    const router = useRouter();
    
    useEffect(() => {
        if(user) router.replace('/events');
    }, [user])

    return (
        <div className="w-full min-h-screen">
            <Header />
        </div>
    )
}
