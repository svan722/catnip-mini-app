import { useState, useEffect } from 'react';
import { useInitData, useInvoice } from '@telegram-apps/sdk-react';
// import { useTonWallet, useTonConnectUI, CHAIN, useTonAddress } from '@tonconnect/ui-react';
import { toast } from 'react-toastify';
import API from '@/libs/api';
import Countdown from 'react-countdown';
// import { OWNER_ADDRESS, IS_MAINNET } from "@/libs/constants";

export default function Boost() {
    const { user } = useInitData();
    const invoice = useInvoice();

    // const wallet = useTonWallet();
    // const tonAddress = useTonAddress(true);
    // const [tonConnectUI, ] = useTonConnectUI();

    const [items, setItems] = useState();
    const [totalPrice, setTotalPrice] = useState({usersCount: 0, price: 0});
    const [purchasedItem, setPurchasedItem] = useState();
    const [endTime, setEndTime] = useState(0);

    useEffect(() => {
        API.get('/play/boost/getall').then(res => {
                setItems(res.data.boosts);
            }).catch(err => {
                toast.error('Something went wrong.');
                setItems([]);
                console.error(err);
            });
        API.get('/play/boost/getmy/' + user.id).then(res => {
                if (res.data.success) {
                    setPurchasedItem(res.data.boost.item);
                    setEndTime(res.data.boost.endTime);
                }
            }).catch(err => {
                toast.error('Something went wrong.');
                console.error(err);
            });
        API.get('/play/boost/gethistory').then(res => {
                if (res.data.success) {
                    setTotalPrice(res.data.total);
                }
            }).catch(err => {
                toast.error('Something went wrong.');
                console.error(err);
            });
    }, []);

    // useEffect(() => {
    //     if (!wallet) return;
    //     if (tonConnectUI.wallet.account.chain !== CHAIN.MAINNET) {
    //         console.log("You're not in mainnet.");
    //     }
    // }, [wallet]);

    // const handleConnectWallet = () => {
    //     if (wallet) tonConnectUI.disconnect();
    //     else tonConnectUI.openModal();
    // }

    // const handlePayment = (item) => {
    //     if (!wallet) return toast.error("Connect your wallet to send transaction.");
    //     const amount = (item.price * Math.pow(10, 9)).toString();
    //     tonConnectUI.sendTransaction({
    //             validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    //             network: IS_MAINNET ? CHAIN.MAINNET : CHAIN.TESTNET,
    //             messages: [
    //                 {
    //                     address: OWNER_ADDRESS,
    //                     amount: amount,
    //                 }
    //             ]
    //         }).then(res => {
    //             console.log('Transaction success:', res);
    //             return API.post('users/boost/purchase', { userid: user.id, boostid: item._id, tx: res });
    //         }).then(res => {
    //             if (res.data.success) {
    //                 toast.success(res.data.msg);
    //                 setPurchasedItem(items?.find(i => i._id === item._id));
    //                 setEndTime(res.data.boost.endTime);
    //                 setTotalUser(prev => prev + 1);
    //                 setTotalPrice(prev => prev + res.data.boost.item.price);
    //             } else {
    //                 toast.error(res.data.msg);
    //             }
    //         }).catch(err => {
    //             toast.error('Something went wrong.');
    //             console.error(err);
    //         });
    // }

    const handlePayment = (item) => {
        API.post('/play/invoice', { userid: user.id, id: item._id })
        .then(res => {
            console.log(res.data);
            invoice.open(res.data.link, 'url').then(invoiceRes => {
                console.log("invoice res=", invoiceRes);
                if (invoiceRes === 'paid') {
                    setPurchasedItem(item);
                    setEndTime(Date.now() + item.period * 24 * 60 * 60 * 1000);
                }
                setTotalPrice(prev => ({
                    usersCount: parseInt(prev.usersCount, 10) + 1,
                    price: parseInt(prev.price, 10) + item.price
                }));
            });
        }).catch(err => {
            console.error(err);
            toast.error(err.message);
        });
    }
    
    return (
        <div className="px-[28px] bg-[url('/imgs/background.png'),linear-gradient(to_bottom,#E3F5FC,#90D6F3)] bg-cover bg-center pb-[20px]">
            <div className="pt-[40px] flex flex-col items-center">
                <img src="/imgs/token.png" className="w-[35px] h-[35px]" alt="" />
                <h1 className="text-[32px] mt-[10px] leading-[40px] text-center font-caveat text-primary">Boost your Catnip Sprint</h1>
            </div>
            <p className="font-poppins text-center text-black text-[10px] leading-[15px]">Make our tasks to get more coins </p>
            <div className="flex justify-between items-center mt-[20px]">
                {/* <button onClick={handleConnectWallet} className="px-[10px] h-[45px] rounded-[5px] bg-primary text-white font-poppins text-[12px] font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_5px_#333333]">{ wallet ? tonAddress?.slice(0, 5) + '...' + tonAddress?.slice(-5) : 'Connect Wallet' }</button> */}
                <div className="text-[14px] text-black font-rubik font-medium leading-none flex items-end">Total:&nbsp;<span className="text-primary">{ totalPrice.price.toLocaleString() }</span> <img className="w-4 h-4 ml-1 mr-3" src="/imgs/star.png" alt="" /> <span className="text-primary">{ totalPrice.usersCount.toLocaleString() }</span>&nbsp;Users</div>
            </div>
            <div className="mt-[27px] divide-y-[1px]">
                {
                    items ? items.map((item, key) =>
                        <div key={key} className="py-[14px] flex items-center justify-between">
                            <div className="flex items-center gap-[11px]">
                                <div className="h-[43px] w-[43px] rounded-[2px] border border-[#81C3D71A] bg-[#39BDFF] flex items-center justify-center">
                                    <img src="/imgs/rocket.svg" width={18} height={18} alt="" />
                                </div>
                                <div className="flex flex-col items-start justify-between font-medium font-inter">
                                    <div className="text-[8px] leading-[9.68px] text-[#757D7F]"></div>
                                    <div className="text-[12px] leading-[14.52px] mt-[2px] text-primary">{ item.title }</div>
                                    <div className="flex items-center mt-[4px]">
                                        <div className="text-[8px] leading-[9.68px] text-secondary -mt-px">Get boost</div>
                                        <svg width="7" height="7" viewBox="0 0 3 5" fill="#505050" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M2.88569 2.37654L1.00002 4.2622L0.528687 3.79087L2.17869 2.14087L0.528687 0.49087L1.00002 0.019537L2.88569 1.9052C2.94818 1.96771 2.98328 2.05248 2.98328 2.14087C2.98328 2.22926 2.94818 2.31403 2.88569 2.37654Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {
                                purchasedItem ? 
                                <button disabled={true} onClick={() => handlePayment(item)} className="w-[85px] h-[31px] rounded-[4px] bg-white disabled:bg-primary disabled:hover:cursor-not-allowed disabled:text-white hover:bg-primary text-[#EA5384] hover:text-white font-poppins text-[10px] transition-colors duration-300">
                                    { purchasedItem._id === item._id ? <Countdown date={endTime} intervalDelay={1000} precision={3} onComplete={() => setPurchasedItem(null)} renderer={(props) => <span>{props.days ? props.days.toString() + 'd' : ''} {props.hours.toString()} : {props.minutes.toString().padStart(2, '0')} : {props.seconds.toString().padStart(2, '0')}</span>} /> : '---' }
                                </button> :
                                <button onClick={() => handlePayment(item)} className="w-[85px] flex items-center justify-center gap-2 h-[31px] rounded-[4px] bg-black/10 disabled:bg-primary disabled:hover:cursor-not-allowed disabled:text-white hover:bg-primary text-[#EA5384] hover:text-white font-poppins text-[10px] transition-colors duration-300">
                                    <img className="w-3 h-3" alt="" src="/imgs/star.png" />
                                    <span className="mt-[3px] font-bold leading-none">{ item.price }</span>
                                </button>
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
            <div className="relative">
                <img className="absolute h-[95px] -bottom-[100px] -right-[30px]" src="/imgs/print.png" alt="" />
            </div>
            <div className="mt-[40px]">
                <img className="h-[149px] -translate-x-[20px] translate-y-[16px]" src="/imgs/cute.png" alt="" />
            </div>
        </div>
    )
}