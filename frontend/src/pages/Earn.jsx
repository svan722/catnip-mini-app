import React, {useEffect, useState} from 'react';
import { useInitData } from "@telegram-apps/sdk-react";
import { useTonWallet, useTonConnectModal } from '@tonconnect/ui-react';
import API from "@/libs/api";
import { Link } from "@/components/Link";
import { LINK, PLATFORM } from "@/libs/constants";
import { toast } from 'react-toastify';
import Countdown from 'react-countdown';

const GroupModal = ({ isOpen, setOpen, callback }) => {
    return (
        <div onClick={() => setOpen(false)} className={`${isOpen ? 'flex' : 'hidden'} font-inter fixed inset-0 z-20 items-center justify-center backdrop-blur-lg`}>
            <div onClick={e => e.stopPropagation()} className="rounded-xl py-5 px-4 border border-transparent [background:linear-gradient(#087092,#082932)_padding-box,linear-gradient(#ffffffff,#00000000)_border-box] mx-auto">
                <h1 className="mb-3 text-2xl font-bold font-poppins">Join Telegram Group</h1>
                <div className="flex justify-center gap-3">
                    <Link to={LINK.TELEGRAM_GROUP} className="mr-3 font-lily text-[20px] rounded-full py-[5px] pl-[25px] pr-[20px] border border-transparent [box-shadow:inset_0_0_4px_#000000aa] [background:linear-gradient(#0AFDD1,#03452FD6)_padding-box,linear-gradient(#FFFFFF,#99999900)_border-box] hover:-translate-y-1 transition-all duration-300">
                        <span className="shadow-text">Join</span>
                    </Link>
                    <button onClick={callback} className="font-lily text-[20px] rounded-full py-[5px] pl-[25px] pr-[20px] border border-transparent [box-shadow:inset_0_0_4px_#000000aa] [background:linear-gradient(#FD0A94,#450318D6)_padding-box,linear-gradient(#FFFFFF,#99999900)_border-box] hover:-translate-y-1 transition-all duration-300">
                        <span className="shadow-text">Claim</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

const ChannelDialog = ({ isOpen, setOpen, callback }) => {
    return (
        <div onClick={() => setOpen(false)} className={`${isOpen ? 'flex' : 'hidden'} fixed inset-0 z-20 items-center justify-center backdrop-blur-lg`}>
            <div onClick={e => e.stopPropagation()} className="rounded-xl py-5 px-4 border border-transparent [background:linear-gradient(#087092,#082932)_padding-box,linear-gradient(#ffffffff,#00000000)_border-box] mx-auto">
                <h1 className="mb-3 text-2xl font-bold font-poppins">Join Telegram Channel</h1>
                <div className="flex justify-center gap-3">
                    <Link to={LINK.TELEGRAM_CHANNEL} className="mr-3 font-lily text-[20px] rounded-full py-[5px] pl-[25px] pr-[20px] border border-transparent [box-shadow:inset_0_0_4px_#000000aa] [background:linear-gradient(#0AFDD1,#03452FD6)_padding-box,linear-gradient(#FFFFFF,#99999900)_border-box] hover:-translate-y-1 transition-all duration-300">
                        <span className="shadow-text">Join</span>
                    </Link>
                    <button onClick={callback} className="font-lily text-[20px] rounded-full py-[5px] pl-[25px] pr-[20px] border border-transparent [box-shadow:inset_0_0_4px_#000000aa] [background:linear-gradient(#FD0A94,#450318D6)_padding-box,linear-gradient(#FFFFFF,#99999900)_border-box] hover:-translate-y-1 transition-all duration-300">
                        <span className="shadow-text">Claim</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

const FollowXDialog = ({ isOpen, setOpen, callback, userid }) => {
    const [username, setUsername] = useState('');
    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleEnterKey = (e) => {
        if (e.keyCode !== 13) return;
        callback(username);
    }
    const handleLink = () => {
        API.post('/users/follow', { userid, platform: PLATFORM.X }).catch(console.error);
    }
    return (
        <div onClick={() => setOpen(false)} className={`${isOpen ? 'flex' : 'hidden'} fixed inset-0 z-20 items-center justify-center backdrop-blur-lg`}>
            <div onClick={e => e.stopPropagation()} className="rounded-[34px] px-[23px] pt-4 border border-transparent [box-shadow:inset_0_0_4px_#000000aa] [background:linear-gradient(#a19a02,#2d2d0c)_padding-box,linear-gradient(#00000000,#ffffffff)_border-box] mx-auto">
                <h1 className="mb-3 text-3xl font-bold text-center font-poppins">Follow X (Twitter)</h1>
                <div className="flex justify-center">
                    <Link propsOnClick={handleLink} to={LINK.X} className="mr-3 font-lily text-[20px] rounded-full py-[5px] pl-[25px] pr-[20px] border border-transparent [box-shadow:inset_0_0_4px_#000000aa] [background:linear-gradient(#0AFDD1,#03452FD6)_padding-box,linear-gradient(#FFFFFF,#99999900)_border-box] hover:-translate-y-1 transition-all duration-300">
                        <span className="shadow-text">Follow</span>
                    </Link>
                </div>
                <p className="mt-6 text-base text-center font-jersey25 shadow-text">If you already followed, enter your Username:</p>
                <div className="mt-[5px] mb-[10px] flex items-center gap-2 w-[280px] rounded-full py-[5px] pr-[5px] [box-shadow:inset_0_0_4px_#000000aa] border border-transparent [background:linear-gradient(#574204,#232006)_padding-box,linear-gradient(#FFFFFF,#999999)_border-box]">
                    <input onChange={handleChangeUsername} onKeyDown={handleEnterKey} className="flex-1 w-full ml-4 text-center bg-transparent rounded-full outline-none" value={username} type="text" placeholder="@username" />
                    <button onClick={() => callback(username)} className="text-base font-jersey25 bg-gradient-to-b h-[34px] w-[66px] rounded-l-[2000px] rounded-r-full from-[#B38A01] to-[#3A3501] border border-white">Submit</button>
                </div>
            </div>
        </div>
    )
}

const RetweetXDialog = ({ isOpen, setOpen, callback, userid }) => {
    const [username, setUsername] = useState('');
    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleEnterKey = (e) => {
        if (e.keyCode !== 13) return;
        callback(username);
    }
    const handleLink = () => {
        API.post('/users/follow', { userid, platform: PLATFORM.TWEET }).catch(console.error);
    }
    return (
        <div onClick={() => setOpen(false)} className={`${isOpen ? 'flex' : 'hidden'} fixed inset-0 z-20 items-center justify-center backdrop-blur-lg`}>
            <div onClick={e => e.stopPropagation()} className="rounded-[34px] px-[23px] pt-4 border border-transparent [box-shadow:inset_0_0_4px_#000000aa] [background:linear-gradient(#a19a02,#2d2d0c)_padding-box,linear-gradient(#00000000,#ffffffff)_border-box] mx-auto">
                <h1 className="mb-3 text-3xl font-bold text-center font-poppins">Retweet X (Twitter)</h1>
                <div className="flex justify-center">
                    <Link propsOnClick={handleLink} to={LINK.TWEET} className="mr-3 font-lily text-[20px] rounded-full py-[5px] pl-[25px] pr-[20px] border border-transparent [box-shadow:inset_0_0_4px_#000000aa] [background:linear-gradient(#0AFDD1,#03452FD6)_padding-box,linear-gradient(#FFFFFF,#99999900)_border-box] hover:-translate-y-1 transition-all duration-300">
                        <span className="shadow-text">Retweet</span>
                    </Link>
                </div>
                <p className="mt-6 text-base text-center font-jersey25 shadow-text">If you already retweeted, enter your Username:</p>
                <div className="mt-[5px] mb-[10px] flex items-center gap-2 w-[280px] rounded-full py-[5px] pr-[5px] [box-shadow:inset_0_0_4px_#000000aa] border border-transparent [background:linear-gradient(#574204,#232006)_padding-box,linear-gradient(#FFFFFF,#999999)_border-box]">
                    <input onChange={handleChangeUsername} onKeyDown={handleEnterKey} className="flex-1 w-full ml-4 text-center bg-transparent rounded-full outline-none" value={username} type="text" placeholder="@username" />
                    <button onClick={() => callback(username)} className="text-base font-jersey25 bg-gradient-to-b h-[34px] w-[66px] rounded-l-[2000px] rounded-r-full from-[#B38A01] to-[#3A3501] border border-white">Submit</button>
                </div>
            </div>
        </div>
    )
}


export default function Earn() {
    const { user } = useInitData();
    const wallet = useTonWallet();
    const { open, close } = useTonConnectModal();
    const [openGroupModal, setOpenGroupModal] = useState(false);
    const [openChannelModal, setOpenChannelModal] = useState(false);
    const [openFollowXModal, setOpenFollowXModal] = useState(false);
    const [openRetweetXModal, setOpenRetweetXModal] = useState(false);

    const [isConnectedWallet, setConnectedWallet] = useState(false);
    const [isJoinedTelegramGroup, setJoinedTelegramGroup] = useState(false);
    const [isJoinedTelegramChannel, setJoinedTelegramChannel] = useState(false);
    const [isFollowingX, setFollowingX] = useState(false);
    const [isRetweetX, setRetweetX] = useState(false);

    const [dailyRemainSecond, setDailyRemainSecond] = useState(0);
    const [dailyReward, setDailyReward] = useState(100);

    useEffect(() => {
        API.get(`/users/get/${user.id}`).then(res => {
            setFollowingX(res.data.xFollowed);
            setRetweetX(res.data.xTweet);
            setJoinedTelegramChannel(res.data.telegramChannelJoined);
            setJoinedTelegramGroup(res.data.telegramGroupJoined);
            setConnectedWallet(res.data.walletConnected);
        }).catch(console.error);
        handleClaimDailyReward();
    }, [user])

    const handleJoinTelegramGroup = () => {
        API.post('/users/jointg', {
            userid: user.id,
            type: 'group'
        }).then(res => {
            if(res.data.success) {
                setJoinedTelegramGroup(true);
                setOpenGroupModal(false);
                toast.success(res.data.msg);
            }
            else toast.error(res.data.msg);
        }).catch(console.error);
    }

    const handleJoinTelegramChannel = () => {
        API.post('/users/jointg', {
            userid: user.id,
            type: 'channel'
        }).then(res => {
            if(res.data.success) {
                setJoinedTelegramChannel(true);
                setOpenChannelModal(false);
                toast.success(res.data.msg);
            }
            else toast.error(res.data.msg);
        }).catch(console.error);
    }

    const handleFollowX = (username) => {
        API.post('/users/followx', { userid:user.id, username }).then(res => {
            if(res.data.success) {
                setFollowingX(true);
                setOpenFollowXModal(false);
                toast.success(res.data.msg);
            }
            else toast.error(res.data.msg);
        }).catch(console.error);
    }

    const handleRetweetX = (username) => {
        API.post('/users/tweet', { userid:user.id, username }).then(res => {
            if(res.data.success) {
                setRetweetX(true);
                setOpenRetweetXModal(false);
                toast.success(res.data.msg);
            }
            else toast.error(res.data.msg);
        }).catch(err => console.error(err));
    }

    const handleClaimDailyReward = (status = 0) => {
        API.post(`/users/claim/daily`, { userid: user.id, status}).then(res => {
            if(res.data.success) {
                setDailyRemainSecond(res.data.ms);
                setDailyReward(res.data.reward);
                if(res.data.status == 'success') {
                    toast.success(res.data.msg);
                }
            } else {
                toast.error(res.data.msg);
            }
        }).catch(console.error);
    }

    const handleConnectWallet = () => {
        if (isConnectedWallet) return;
        if (wallet) {
            API.post(`/users/connect_wallet`, { userid: user.id }).then(res => {
                if(res.data.success) {
                    setConnectedWallet(true);
                    toast.success(res.data.msg);
                } else toast.error(res.data.msg);
            }).catch(console.error)
        } else {
            open();
        }
    }
    
    return (
        <div className="mx-[28px]">
            <div className="pt-[40px] flex justify-between items-center">
                <img src="/imgs/logo.png" width={30} height={30} alt="" />
                <span className="text-[28px] leading-[42px] font-bold font-poppins text-primary">Earn More Coins</span>
                <img src="/imgs/logo.png" width={30} height={30} className="-scale-x-100" alt="" />
            </div>
            <p className="font-poppins text-[10px] text-center leading-[15px]">Make our tasks to get more coins </p>
            <div className="mt-[47px] divide-y-[1px]">
                <div className="py-[14px] flex items-center justify-between">
                    <div className="flex items-center gap-[11px]">
                        <div className="h-[43px] w-[43px] rounded-[9px] border border-white/10 bg-white/10 flex items-center justify-center">
                            <img src="/imgs/wallet.svg" width={20} height={20} alt="" />
                        </div>
                        <div className="flex flex-col items-start justify-between font-medium font-inter">
                            <div className="text-[8px] leading-[9.68px] text-white/[0.57]">1,000 Onions</div>
                            <div className="text-[12px] leading-[14.52px] mt-[2px]">Wallet connect</div>
                            <div className="flex items-center mt-[4px]">
                                <div className="text-[8px] leading-[9.68px] text-primary -mt-px">Get reward</div>
                                <svg width="7" height="7" viewBox="0 0 3 5" fill="#FF5189" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.88569 2.37654L1.00002 4.2622L0.528687 3.79087L2.17869 2.14087L0.528687 0.49087L1.00002 0.019537L2.88569 1.9052C2.94818 1.96771 2.98328 2.05248 2.98328 2.14087C2.98328 2.22926 2.94818 2.31403 2.88569 2.37654Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <button disabled={isConnectedWallet} onClick={handleConnectWallet} className="w-[85px] h-[31px] rounded-[9px] bg-white disabled:bg-primary disabled:hover:cursor-not-allowed disabled:text-white hover:bg-primary text-[#EA5384] hover:text-white font-poppins text-[10px] transition-colors duration-300">{ isConnectedWallet ? 'Connected' : (wallet ? 'Redeem' : 'Connect') }</button>
                </div>
                <div className="py-[14px] flex items-center justify-between">
                    <div className="flex items-center gap-[11px]">
                        <div className="h-[43px] w-[43px] rounded-[9px] border border-white/10 bg-white/10 flex items-center justify-center">
                            <img src="/imgs/telegram.svg" width={23} height={19} alt="" />
                        </div>
                        <div className="flex flex-col items-start justify-between font-medium font-inter">
                            <div className="text-[8px] leading-[9.68px] text-white/[0.57]">300 Onions</div>
                            <div className="text-[12px] leading-[14.52px] mt-[2px]">Join our TG channel</div>
                            <div className="flex items-center mt-[4px]">
                                <div className="text-[8px] leading-[9.68px] text-primary -mt-px">Get reward</div>
                                <svg width="7" height="7" viewBox="0 0 3 5" fill="#FF5189" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.88569 2.37654L1.00002 4.2622L0.528687 3.79087L2.17869 2.14087L0.528687 0.49087L1.00002 0.019537L2.88569 1.9052C2.94818 1.96771 2.98328 2.05248 2.98328 2.14087C2.98328 2.22926 2.94818 2.31403 2.88569 2.37654Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <button disabled={isJoinedTelegramChannel} onClick={() => setOpenChannelModal(true)} className="w-[85px] h-[31px] rounded-[9px] bg-white disabled:bg-primary disabled:hover:cursor-not-allowed disabled:text-white hover:bg-primary text-[#EA5384] hover:text-white font-poppins text-[10px] transition-colors duration-300">{ isJoinedTelegramChannel ? 'Joined' : 'Redeem'}</button>
                    {openChannelModal && <ChannelDialog isOpen={openChannelModal} setOpen={setOpenChannelModal} callback={handleJoinTelegramChannel} />}
                </div>
                <div className="py-[14px] flex items-center justify-between">
                    <div className="flex items-center gap-[11px]">
                        <div className="h-[43px] w-[43px] rounded-[9px] border border-white/10 bg-white/10 flex items-center justify-center">
                            <img src="/imgs/twitter.svg" width={20} height={20} alt="" />
                        </div>
                        <div className="flex flex-col items-start justify-between font-medium font-inter">
                            <div className="text-[8px] leading-[9.68px] text-white/[0.57]">300 Onions</div>
                            <div className="text-[12px] leading-[14.52px] mt-[2px]">Follow our X account</div>
                            <div className="flex items-center mt-[4px]">
                                <div className="text-[8px] leading-[9.68px] text-primary -mt-px">Get reward</div>
                                <svg width="7" height="7" viewBox="0 0 3 5" fill="#FF5189" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.88569 2.37654L1.00002 4.2622L0.528687 3.79087L2.17869 2.14087L0.528687 0.49087L1.00002 0.019537L2.88569 1.9052C2.94818 1.96771 2.98328 2.05248 2.98328 2.14087C2.98328 2.22926 2.94818 2.31403 2.88569 2.37654Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <button disabled={isFollowingX} onClick={() => setOpenFollowXModal(true)} className="w-[85px] h-[31px] rounded-[9px] bg-white disabled:bg-primary disabled:hover:cursor-not-allowed disabled:text-white hover:bg-primary text-[#EA5384] hover:text-white font-poppins text-[10px] transition-colors duration-300">{isFollowingX ? 'Followed' : 'Redeem'}</button>
                    {openFollowXModal && <FollowXDialog isOpen={openFollowXModal} setOpen={setOpenFollowXModal} callback={handleFollowX} userid={user.id} />}
                </div>
                {/* <div className="py-[14px] flex items-center justify-between">
                    <div className="flex items-center gap-[11px]">
                        <div className="h-[43px] w-[43px] rounded-[9px] border border-white/10 bg-white/10 flex items-center justify-center">
                            <img src="/imgs/telegram.svg" width={23} height={19} alt="" />
                        </div>
                        <div className="flex flex-col items-start justify-between font-medium font-inter">
                            <div className="text-[8px] leading-[9.68px] text-white/[0.57]">250 Onions</div>
                            <div className="text-[12px] leading-[14.52px] mt-[2px]">Join our TG group</div>
                            <div className="flex items-center mt-[4px]">
                                <div className="text-[8px] leading-[9.68px] text-primary -mt-px">Get reward</div>
                                <svg width="7" height="7" viewBox="0 0 3 5" fill="#FF5189" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.88569 2.37654L1.00002 4.2622L0.528687 3.79087L2.17869 2.14087L0.528687 0.49087L1.00002 0.019537L2.88569 1.9052C2.94818 1.96771 2.98328 2.05248 2.98328 2.14087C2.98328 2.22926 2.94818 2.31403 2.88569 2.37654Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <button disabled={isJoinedTelegramGroup} onClick={() => setOpenGroupModal(true)} className="w-[85px] h-[31px] rounded-[9px] bg-white disabled:bg-primary disabled:hover:cursor-not-allowed disabled:text-white hover:bg-primary text-[#EA5384] hover:text-white font-poppins text-[10px] transition-colors duration-300">{isJoinedTelegramGroup ? 'Joined' : 'Redeem'}</button>
                    {openGroupModal && <GroupModal isOpen={openGroupModal} setOpen={setOpenGroupModal} callback={handleJoinTelegramGroup}/>}
                </div> */}
            </div>
            <div className="mt-[28px] text-[19px] leading-[23px] font-inter font-bold">Daily Task</div>
            <div className="mt-[23px] divide-y-[1px]">
                <div className="py-[14px] flex items-center justify-between">
                    <div className="flex items-center gap-[11px]">
                        <div className="h-[43px] w-[43px] rounded-[9px] border border-white/10 bg-white/10 flex items-center justify-center">
                            <img src="/imgs/daily.png" width={23} height={19} alt="" />
                        </div>
                        <div className="flex flex-col items-start justify-between font-medium font-inter">
                            <div className="text-[8px] leading-[9.68px] text-white/[0.57]">{`${dailyReward} Onions`}</div>
                            <div className="text-[12px] leading-[14.52px] mt-[2px]">Daily Reward</div>
                            <div className="flex items-center mt-[4px]">
                                <div className="text-[8px] leading-[9.68px] text-primary -mt-px">Get reward</div>
                                <svg width="7" height="7" viewBox="0 0 3 5" fill="#FF5189" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.88569 2.37654L1.00002 4.2622L0.528687 3.79087L2.17869 2.14087L0.528687 0.49087L1.00002 0.019537L2.88569 1.9052C2.94818 1.96771 2.98328 2.05248 2.98328 2.14087C2.98328 2.22926 2.94818 2.31403 2.88569 2.37654Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    {
                        dailyRemainSecond > 0 ?
                        <button className="w-[85px] h-[31px] rounded-[9px] bg-primary hover:cursor-not-allowed text-white font-poppins text-[10px]">
                            <Countdown date={Date.now() + dailyRemainSecond} intervalDelay={1000} precision={3} onComplete={() => setDailyRemainSecond(0)} renderer={(props) => <span>{props.hours.toString().padStart(2, '0')} : {props.minutes.toString().padStart(2, '0')} : {props.seconds.toString().padStart(2, '0')}</span>} />
                        </button> :
                        <button onClick={() => handleClaimDailyReward(1)} className="w-[85px] h-[31px] rounded-[9px] bg-white disabled:bg-primary disabled:hover:cursor-not-allowed disabled:text-white hover:bg-primary text-[#EA5384] hover:text-white font-poppins text-[10px] transition-colors duration-300">Redeem</button>
                    }
                </div>
                <div className="py-[14px] flex items-center justify-between">
                    <div className="flex items-center gap-[11px]">
                        <div className="h-[43px] w-[43px] rounded-[9px] border border-white/10 bg-white/10 flex items-center justify-center">
                            <img src="/imgs/twitter.svg" width={20} height={20} alt="" />
                        </div>
                        <div className="flex flex-col items-start justify-between font-medium font-inter">
                            <div className="text-[8px] leading-[9.68px] text-white/[0.57]">250 Onions</div>
                            <div className="text-[12px] leading-[14.52px] mt-[2px]">Retweet our post</div>
                            <div className="flex items-center mt-[4px]">
                                <div className="text-[8px] leading-[9.68px] text-primary -mt-px">Get reward</div>
                                <svg width="7" height="7" viewBox="0 0 3 5" fill="#FF5189" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.88569 2.37654L1.00002 4.2622L0.528687 3.79087L2.17869 2.14087L0.528687 0.49087L1.00002 0.019537L2.88569 1.9052C2.94818 1.96771 2.98328 2.05248 2.98328 2.14087C2.98328 2.22926 2.94818 2.31403 2.88569 2.37654Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <button disabled={isRetweetX} onClick={() => setOpenRetweetXModal(true)} className="w-[85px] h-[31px] rounded-[9px] bg-white disabled:bg-primary disabled:hover:cursor-not-allowed disabled:text-white hover:bg-primary text-[#EA5384] hover:text-white font-poppins text-[10px] transition-colors duration-300">{isRetweetX ? 'Claimed' : 'Redeem'}</button>
                    {openRetweetXModal && <RetweetXDialog isOpen={openRetweetXModal} setOpen={setOpenRetweetXModal} callback={handleRetweetX} userid={user.id} />}
                </div>
            </div>
        </div>
    )
}