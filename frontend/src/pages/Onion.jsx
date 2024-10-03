import React, { useEffect, useState } from 'react';
import { Link } from '@/components/Link';
import { useInitData } from '@telegram-apps/sdk-react';
import API from '@/libs/api';

export default function Onion() {
    const { user } = useInitData();
    const [onion, setOnion] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [maxEnergy, setMaxEnergy] = useState(1000);

    useEffect(() => {
        API.get(`/users/get/${user.id}`)
            .then((res) => {
                setOnion(res.data.onion);
                setEnergy(res.data.energy);
                setMaxEnergy(res.data.maxEnergy);
            })
            .catch(err=>console.log(err))
    },[user]);

    useEffect(() => {
        const id = setInterval(async () => {
            if (maxEnergy <= energy) {
                clearInterval(id);            
            }
            const res = await API.put('/users/growUp',{userid: user.id});
            if(res.data.success) {
                setEnergy(res.data.energy)
            }
        }, 1000);
        
        return () => clearInterval(id);
    }, [energy, maxEnergy]);
    return (
        <div className="pt-[40px] pb-[40px]">
            <div className="flex justify-center">
                <img src="/imgs/onion.png" width={339} height={316} alt="" />
            </div>
            <div className="flex justify-center gap-[6px] mt-[29px]">
                <Link to="/" className="flex gap-[3px] items-center justify-center bg-[#EA5384]/80 hover:bg-[#EA5384] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 rounded-[5px] w-[129px] h-[45px]">
                    <img src="/imgs/tap.svg" width={25} height={25} alt="" />
                    <span className="font-poppins font-semibold text-[14px] text-[#EEF5F8]">Tap ONION</span>
                </Link>
                <Link to="/boost" className="flex gap-[6px] items-center justify-center bg-[#42C948]/80 hover:bg-[#42C948] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 rounded-full w-[128px] h-[45px]">
                    <img src="/imgs/boost.svg" width={29} height={29} alt="" />
                    <span className="font-poppins font-semibold text-[14px] text-[#EEF5F8]">Boost</span>
                </Link>
            </div>
            <div className="flex flex-col items-center mt-[32px]">
                <div className="flex items-center gap-[8px]">
                    <img src="/imgs/token.png" width={21} height={23} alt="" />
                    <span className="font-bold text-[28px] leading-[42px] font-poppins">{onion}</span>
                </div>
                <div className="flex items-center gap-[4px]">
                    <img src="/imgs/lightning.svg" width={14} height={14} alt="" />
                    <span className="text-[13px] leading-[19.5px] font-poppins">{energy}/{maxEnergy}</span>
                </div>
            </div>
            {/* <div className="mt-[42px] rounded-[12px] bg-[#E5D7D733] h-[38px] p-[4px] pl-[22px] mx-[35px] gap-[5px] flex items-center">
                <div className="flex items-center flex-1">
                    <input value={code} onChange={handleChangeCode} onKeyDown={handleEnterKey} className="bg-transparent w-full text-[10px] outline-none font-roboto placeholder:text-[#958787]" type="text" placeholder="Daily Rewards" />
                </div>
                <button onClick={handleSubmitDailyCode} className="h-[30px] w-[99px] rounded-[6px] bg-[#EA5384] flex justify-center items-center gap-[2px]">
                    <img src="/imgs/token.png" width={13} height={14} />
                    <span className="font-poppins text-[11px]">+1,000,000</span>
                </button>
            </div> */}
        </div>
    )
}