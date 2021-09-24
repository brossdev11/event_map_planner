import Layout from '../components/Layout';
import '../styles/global.css';
import 'tailwindcss/tailwind.css'
import "react-notifications-component/dist/theme.css";
import ReactNotification from "react-notifications-component";


export default function MyApp({ Component, pageProps }) {

    return (
        <>
            <Layout>
                <ReactNotification />
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
