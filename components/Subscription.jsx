import Button from '../components/common/Button';

const Subscription = () => {
  return (
    <div className="w-full pt-20 pl-40 mx-auto text-gray-400">
      <div className="w-full text-gray-400 text-[40px] font-bold mb-20">
        Your Subscription
      </div>
      <div className="w-full flex gap-8">
        <div className="w-[243px] h-[261px] bg-white rounded-t-lg flex justify-center items-center flex-col">
          <div className="text-3xl w-full text-left pl-5 my-16">Free</div>
          <Button style="primary" type="button" selected>Selected</Button>
        </div>
        <div className="w-[243px] h-[261px] bg-white rounded-t-lg flex justify-center items-center flex-col">
          <div className="text-3xl w-full text-left pl-5 my-16">Basic</div>
          <Button style="primary" type="button">Change</Button>
        </div>
        <div className="w-[243px] h-[261px] bg-white rounded-t-lg flex justify-center items-center flex-col">
          <div className="text-3xl w-full text-left pl-5 my-16">Plus</div>
          <Button style="primary" type="button">Change</Button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
