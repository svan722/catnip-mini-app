import React, {useState, useEffect} from 'react';
import { useInitData, useUtils } from "@telegram-apps/sdk-react";
import { LINK } from "@/libs/constants";
import API from "@/libs/api";
import Avatar from '@/components/Avatar';

export default function Invite() {
    const { user } = useInitData();
    const utils = useUtils();
    const [friends, setFriends] = useState([]);
    const [token, setToken] = useState();
    const [onion, setOnion] = useState();
    useEffect(() => {
        API.get('/users/friends/' + user.id)
            .then(res => {
                setFriends(res.data.friends);
            }).catch(err => console.error(err.message));
        API.get(`/users/get/${user.id}`)
            .then(res => {
                setToken(res.data.token);
                setOnion(res.data.onion);
            })
    }, [user]);

    const handleClickInviteLink = (e) => {
        const link = LINK.TELEGRAM_MINIAPP + '?start=' + user.id;
        const shareText = 'Join our telegram mini app.';
        const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(shareText)}`;
        utils.openTelegramLink(fullUrl);
    }

    const handleInviteLinkCopyButton = (e) => {
        const link = LINK.TELEGRAM_MINIAPP + '?start=' + user.id;
        const textElement = document.getElementById('copy_button_text');
        navigator.clipboard.writeText(link)
            .then(() => textElement.innerText = 'Copied')
            .then(() => setTimeout(() => { textElement.innerText = 'Copy'; }, 2000))
            .catch();
    }

    return (
        <div className="pt-[34px] px-[31px] pb-[40px] bg-[url('/imgs/background.png'),linear-gradient(to_bottom,#E3F5FC,#90D6F3)] bg-cover bg-center">
            <div className="flex justify-center">
                <img src="/imgs/invite.png" width={180} height={180} alt="" />
            </div>
            <h1 className="mt-[6px] font-caveat font-bold text-[28px] leading-[42px] text-primary text-center">Invite Friend & Earn</h1>
            <div className="mt-[10px] w-[275px] h-[52px] border-[0.5px] border-primary rounded-[7px] mx-auto border-opacity-45 flex justify-evenly">
                <div className="flex items-center gap-[9px]">
                    <img src="/imgs/user.svg" width={23} height={23} alt="" />
                    <div className="font-poppins font-bold text-[11px]">
                        <div className="">Regular Users</div>
                        <div className="text-primary mt-[2px]">100 Catnip</div>
                    </div>
                </div>
                <div className="flex items-center gap-[9px]">
                    <img src="/imgs/user-premium.svg" width={23} height={23} alt="" />
                    <div className="font-poppins font-bold text-[11px]">
                        <div className="">Premium Users</div>
                        <div className="text-primary mt-[2px]">200 Catnip</div>
                    </div>
                </div>
            </div>
            <div className="mt-[23px]">
                <h2 className="font-caveat font-medium text-[25px] leading-[20px]">Earned</h2>
                <div className="mt-[8px] py-[8px] rounded-[12px] flex justify-around bg-[#39BDFFA3] font-roboto">
                    { token !== null && <div className="flex items-center gap-[6px]">
                        <img src="/imgs/coin.svg" width={24} height={24} alt="" />
                        <span className="front-bold text-[16px]">{token?.toLocaleString()}</span>
                    </div> }
                    { onion !== null && <div className="flex items-center gap-[6px]">
                        <img src="/imgs/token.png" width={21} height={23} alt="" />
                        <span className="front-bold text-[16px]">{onion?.toLocaleString()}</span>
                    </div> }
                </div>
            </div>
            <div className="mt-[23px] flex justify-center gap-[13px]">
                <button onClick={handleClickInviteLink} className="w-[195px] h-[36px] rounded-[5px] bg-white text-[#64DDFF] outline outline-1 outline-offset-1 outline-transparent hover:outline-white transition-all duration-300 text-[12px] font-inter font-medium">Invite a Friend</button>
                <button onClick={handleInviteLinkCopyButton} className="w-[90px] h-[36px] rounded-[4px] bg-primary outline outline-1 outline-offset-1 hover:outline-primary active:outline-transparent outline-transparent transition-all duration-300 flex items-center justify-center gap-[5px] font-inter text-[12px]">
                    <img src="/imgs/link.svg" width={16} height={16} alt="" />
                    <span id="copy_button_text">Copy</span>
                </button>
            </div>
            <div className="relative mt-[38px]">
                <img className="absolute h-[95px] right-0 top-0 -translate-y-[50px] translate-x-[30px]" src="/imgs/print.png" alt="" />
                <h2 className="font-caveat font-medium text-[25px] leading-[22px]">List of your friends</h2>
                <div className="mt-[10px] h-[174px] bg-white/10 rounded-[10px] shadow-[0_0_30px_#98D1FF33] overflow-y-scroll divide-y">
                    {
                        friends.map((friend, key) => <div key={key} className="flex items-center gap-2 px-3 py-2 font-inter">
                            <Avatar userid={friend.userid} width={35} height={35} username={friend?.username} />
                            <div className="flex flex-col justify-between flex-1">
                                <div className="flex text-[12px] items-center">
                                    <span className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap">{friend.firstname + ''}</span>
                                    <img src="/imgs/token.png" width={9} height={10} className="mr-[5px] ml-[5px]" alt="" />
                                    <span className="font-semibold text-primary">{ friend.token }</span>
                                </div>
                                <div className="text-white/[0.13] text-[12px]">{ friend.onion }</div>
                            </div>
                        </div>)
                    }
                    { !friends.length && <p className="pt-[50px] font-inter text-[14px] text-center">You haven’t invited anyone yet</p> }
                </div>
            </div>
        </div>
    )
}