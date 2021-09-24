import Signup from '../components/Signup';
import Header from '../components/Layout/Header';

export default function signup(){
    return (
      <div className="w-full min-h-screen">
          <Header />
          <Signup/>
      </div>
      );
}