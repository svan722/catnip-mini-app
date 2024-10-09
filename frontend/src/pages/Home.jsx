import React, { useEffect, useState, useMemo } from 'react';
import API from '@/libs/api';
import { useInitData } from '@telegram-apps/sdk-react';
import Countdown from 'react-countdown';
import { Howl } from 'howler';

import { useAuth } from '@/providers/AuthProvider';

export default function Home() {
    const { muted, setMuted } = useAuth();

    const meows = useMemo(() => [
        new Howl({ src: ['/mp3/meow1.mp3'] }),
        new Howl({ src: ['/mp3/meow2.mp3'] }),
        new Howl({ src: ['/mp3/meow3.mp3'] }),
        new Howl({ src: ['/mp3/meow4.wav'] }),
        new Howl({ src: ['/mp3/meow5.mp3'] }),
    ], []);

    const { user } = useInitData();

    const [onion, setOnion] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [maxEnergy, setMaxEnergy] = useState(1000);
    const [earnPerTap, setEarnPerTap] = useState(1);
    const [loseEnergyPerTap, setLoseEnergyPerTap] = useState(10);
    const [endTime, setEndTime] = useState();

    const [plusOnes, setPlusOnes] = useState([]);
    
    useEffect(() => {
        if (!user) return;
        API.get(`/users/get/${user.id}`).then(res => {
            setOnion(res.data.onion);
            setEnergy(res.data.energy);
            setMaxEnergy(res.data.maxEnergy);
            setEarnPerTap(res.data.earnPerTap);
            setLoseEnergyPerTap(res.data.loseEnergyPerTap);
        }).catch(console.error);

        API.get('/users/boost/getmy/' + user.id).then(res => {
            res.data.success && setEndTime(res.data.boost.endTime);
        }).catch(console.error);
    }, [user])


    useEffect(() => {
        const id = setInterval(async () => {
            if (maxEnergy <= energy) {
                clearInterval(id);            
            }
            const res = await API.put('/users/growUp',{userid: user.id});
            if(res.data.success) {
                setEnergy(res.data.energy);
            }
        }, 1000);
        
        return () => clearInterval(id);
    }, [energy, maxEnergy]);

    const handleTap = async (e) => {
        e.preventDefault();

        if(energy < loseEnergyPerTap) {
            return;
        }

        meows[Math.floor(Math.random() * meows.length)].play();

        const { pageX, pageY } = e;
        const newPlusOne = {
            id: Date.now(),
            x: pageX,
            y: pageY,
        };
        // Add the new +1 to the state array
        setPlusOnes((prevPlusOnes) => [...prevPlusOnes, newPlusOne]);
        // Remove the +1 after 1 second
        setTimeout(() => {
            setPlusOnes((prevPlusOnes) =>
                prevPlusOnes.filter((plusOne) => plusOne.id !== newPlusOne.id)
            );
        }, 1000); // 1 second animation time
        
        const res = await API.put('/users/tap', {userid: user.id});
        if(res.data.success) {
            setOnion(res.data.onion);
            setEnergy(res.data.energy);
        }
    }
    
    return (
        <div className="pt-[60px] bg-gradient-to-b from-[#E1F4FB] to-[#78CDF0] pb-[60px]">
            <button className="absolute top-2 left-2">
                { muted ? 
                    <img className="w-7 h-7" src="/imgs/mute.svg" alt="" /> :
                    <img className="w-7 h-7" src="/imgs/unmute.svg" alt="" />
                }
            </button>
            {
                endTime ? <Countdown
                    date={endTime}
                    intervalDelay={1000}
                    precision={3}
                    onComplete={() => setEndTime(0)}
                    renderer={(props) => <div className="absolute w-[110px] whitespace-nowrap font-poppins font-bold text-[10px] top-[3px] right-[10px] text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-yellow-500 to-indigo-500 bg-[length:1000px_100px] animate-bg">Boost&nbsp;&nbsp;{props.days ? props.days.toString() + 'd' : ''} {props.hours.toString()} : {props.minutes.toString().padStart(2, '0')} : {props.seconds.toString().padStart(2, '0')}</div>}
                /> : null
            }
            <h1 className="text-center font-mansalva text-[39px] leading-none text-black">Catnip Sprint</h1>
            <div className="relative mt-[25px] flex justify-center">
                <img onClick={handleTap} className={`h-[424px] transition-transform duration-300 active:scale-90 ${ energy < loseEnergyPerTap ? 'cursor-not-allowed' : 'cursor-pointer' }`} draggable="false" src="/imgs/logo.png" alt="" />
            </div>
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-[8px]">
                    <img src="/imgs/token.png" width={21} height={23} alt="" />
                    <span className="font-bold text-[28px] leading-[42px] font-poppins">{ onion.toLocaleString() }</span>
                </div>
                <div className="flex items-center gap-[4px]">
                    <img src="/imgs/lightning.svg" width={14} height={14} alt="" />
                    <span className="text-[13px] leading-[19.5px] font-poppins">{energy}/{maxEnergy}</span>
                </div>
            </div>
            { plusOnes.map((plusOne) =>
                <div key={plusOne.id} className="flex items-center gap-[8px] absolute animate-fadeup pointer-events-none" style={{ left: plusOne.x, top: plusOne.y }}>
                    <img src="/imgs/token.png" width={21} height={23} alt="" />
                    <span className="font-bold text-[28px] leading-[42px] font-poppins text-secondary">{`+${earnPerTap}`}</span>
                </div>)
            }
        </div>
    );
}