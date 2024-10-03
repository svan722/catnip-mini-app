import { useState, useEffect } from 'react';
import { useInitData } from '@telegram-apps/sdk-react';
import { useTonWallet, useTonConnectUI, CHAIN } from '@tonconnect/ui-react';
import { toast } from 'react-toastify';
import API from '@/libs/api';
import Countdown from 'react-countdown';
import { OWNER_ADDRESS } from "@/libs/constants";

export default function Boost() {
    const { user } = useInitData();

    const wallet = useTonWallet();
    const [tonConnectUI, ] = useTonConnectUI();

    const [items, setItems] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [purchasedItem, setPurchasedItem] = useState();
    const [endTime, setEndTime] = useState(0);

    useEffect(() => {
        API.get('/users/boost/getall').then(res => {
                setItems(res.data.boosts);
            }).catch(err => {
                toast.error('Something went wrong.');
                setItems([]);
                console.error(err);
            });
        API.get('/users/boost/getmy/' + user.id).then(res => {
                if (res.data.success) {
                    setPurchasedItem(res.data.boost.item);
                    setEndTime(res.data.boost.endTime);
                }
                if (res.data.success || res.data.status == 'noboost') {
                    const total = res.data.boosts?.reduce((total, boost) => total + boost.item.price, 0);
                    setTotalPrice(total);
                }
            }).catch(err => {
                toast.error('Something went wrong.');
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (!wallet) return;
        if (tonConnectUI.wallet.account.chain !== CHAIN.MAINNET) {
            console.log("You're not in mainnet.");
        }
    }, [wallet]);

    const handleConnectWallet = () => {
        if (wallet) tonConnectUI.disconnect();
        else tonConnectUI.openModal();
    }

    const handlePayment = (item) => {
        if (!wallet) return toast.error("Connect your wallet to send transaction.");
        const amount = (item.price * Math.pow(10, 9)).toString();
        tonConnectUI.sendTransaction({
                validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
                network: CHAIN.MAINNET,
                messages: [
                    {
                        address: OWNER_ADDRESS,
                        amount: amount,
                    }
                ]
            }).then(res => {
                console.log('Transaction success:', res);
                return API.post('users/boost/purchase', { userid: user.id, boostid: item._id });
            }).then(res => {
                if (res.data.success) {
                    toast.success(res.data.msg);
                    setPurchasedItem(items?.find(i => i._id === item._id));
                    setEndTime(res.data.boost.endTime);
                } else {
                    toast.error(res.data.msg);
                }
            }).catch(err => {
                toast.error('Something went wrong.');
                console.error(err);
            });
    }
    
    return (
        <div className="mx-[28px]">
            <div className="pt-[40px] flex justify-between items-center">
                <h1 className="text-[28px] leading-[42px] font-bold font-poppins text-primary">Boost your onion</h1>
            </div>
            <p className="font-poppins text-[10px] leading-[15px]">Make our tasks to get more coins </p>
            <div className="flex justify-between items-end mt-[20px]">
                <button onClick={handleConnectWallet} className="px-[10px] h-[31px] rounded-[9px] bg-primary text-white font-poppins text-[12px] font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_5px_#333333]">{ wallet ? wallet.account.address?.slice(0, 5) + '...' + wallet.account.address?.slice(-5) : 'Connect Wallet' }</button>
                <div className="text-[14px] leading-none">Total: <span className="text-[20px] font-bold text-primary">{ totalPrice.toLocaleString() }</span> TON</div>
            </div>
            <div className="mt-[27px] divide-y-[1px]">
                {
                    items ? items.map((item, key) =>
                        <div key={key} className="py-[14px] flex items-center justify-between">
                            <div className="flex items-center gap-[11px]">
                                <div className="h-[43px] w-[43px] rounded-[9px] border border-white/10 bg-white/10 flex items-center justify-center">
                                    <img src="/imgs/rocket.svg" width={22} height={25} alt="" />
                                </div>
                                <div className="flex flex-col items-start justify-between font-medium font-inter">
                                    <div className="text-[8px] leading-[9.68px] text-white/[0.57]">{ item.name }</div>
                                    <div className="text-[12px] leading-[14.52px] mt-[2px]">{ item.title }</div>
                                    <div className="flex items-center mt-[4px]">
                                        <div className="text-[8px] leading-[9.68px] text-primary -mt-px">Get boost</div>
                                        <svg width="7" height="7" viewBox="0 0 3 5" fill="#FF5189" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.88569 2.37654L1.00002 4.2622L0.528687 3.79087L2.17869 2.14087L0.528687 0.49087L1.00002 0.019537L2.88569 1.9052C2.94818 1.96771 2.98328 2.05248 2.98328 2.14087C2.98328 2.22926 2.94818 2.31403 2.88569 2.37654Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {
                                purchasedItem ? 
                                <button disabled={true} onClick={() => handlePayment(item)} className="w-[85px] h-[31px] rounded-[9px] bg-white disabled:bg-primary disabled:hover:cursor-not-allowed disabled:text-white hover:bg-primary text-[#EA5384] hover:text-white font-poppins text-[10px] transition-colors duration-300">
                                    { purchasedItem._id === item._id ? <Countdown date={endTime} intervalDelay={1000} precision={3} onComplete={() => setPurchasedItem(null)} renderer={(props) => <span>{props.days ? props.days.toString() + 'd' : ''} {props.hours.toString()} : {props.minutes.toString().padStart(2, '0')} : {props.seconds.toString().padStart(2, '0')}</span>} /> : '---' }
                                </button> :
                                <button onClick={() => handlePayment(item)} className="w-[85px] h-[31px] rounded-[9px] bg-white disabled:bg-primary disabled:hover:cursor-not-allowed disabled:text-white hover:bg-primary text-[#EA5384] hover:text-white font-poppins text-[10px] transition-colors duration-300">{ item.price } Ton</button>
                            }
                        </div>
                    ) : Array(3).fill(0).map((_, key) => 
                        <div key={key} className="py-[14px] flex items-center justify-between gap-[11px]">
                            <div className="flex flex-1 items-center gap-[11px]">
                                <div className="h-[43px] w-[43px] rounded-[9px] border border-white/10 bg-white/10 flex items-center justify-center animate-pulse" />
                                <div className="flex-1 h-[43px] bg-white/10 animate-pulse rounded-[9px]" />
                            </div>
                            <div className="w-[85px] h-[43px] rounded-[9px] bg-white/10 animate-pulse" />
                        </div>
                    )
                }
            </div>
        </div>
    )
}