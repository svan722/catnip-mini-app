import React, { useEffect, useState } from 'react';
import { useInitData } from "@telegram-apps/sdk-react";
import API from '@/libs/api';
import Avatar from '@/components/Avatar';
import { CountUp } from "@eeacms/countup";

export default function Leaderboard() {
    const [users, setUsers] = useState([]);
    const [type, setType] = useState("week");
    const [selfRank, setSelfRank] = useState(-1);
    const [self, setSelf] = useState(null);

    const [userCount, setUserCount] = useState(0);
    const [isCounting, setCounting] = useState(false);

    const { user } = useInitData();

    useEffect(() => {
        API.get('/users/count/all')
            .then(res => {
                setUserCount(res.data.count);
                setCounting(true);
            })
            .catch(console.error);
    }, []);
    useEffect(() => {
        API.get(`/users/ranking/${user.id}/${type}`)
            .then(res => {
                setUsers(res.data.users);
                setSelfRank(res.data.rank);
                setSelf(res.data.self);
            }).catch(console.error);
    }, [type])

    const handleClickType = (type) => (e) => {
        e.preventDefault();
        setType(type);
    }

    return (
        <div className="flex flex-col pb-[50px] bg-[url('/imgs/background.png'),linear-gradient(to_bottom,#A5DEF5,white)] bg-cover bg-center">
            <div className="flex gap-[4px] mx-auto mt-[40px] p-[4px] relative">
                <img className="absolute h-[95px] top-1/2 -translate-y-1/2 -left-[70px]" src="/imgs/print.png" alt="" />
                <button onClick={handleClickType("week")} className={`w-[150px] h-[40px] z-10 rounded-[16px] p-[8px] border font-rubik font-medium text-[16px] transition-all duration-300 ${type === "week" ? 'border-transparent bg-primary text-white' : 'hover:border-transparent hover:text-white hover:bg-primary text-secondary border-secondary '}`}>Weekly</button>
                <button onClick={handleClickType("total")} className={`w-[150px] h-[40px] rounded-[16px] p-[8px] border font-rubik font-medium text-[16px] transition-all duration-300 ${type === "total" ? 'border-transparent bg-primary text-white' : 'hover:border-transparent hover:text-white hover:bg-primary text-secondary border-secondary '}`}>All Time</button>
            </div>
            <div className="flex items-end justify-center gap-2 font-poppins mt-[20px]">
                <div className="flex-1 ml-2 border-t border-white -translate-y-[10px]" />
                <span>total</span>
                <div className="text-[30px] font-bold leading-none text-primary"><CountUp end={userCount} formatter={(val) => Math.floor(val).toLocaleString()} isCounting={isCounting} duration={0.5} /></div>
                <span>users</span>
                <div className="flex-1 mr-2 border-t border-white -translate-y-[10px]" />
            </div>
            <div className="mt-[16px] w-[327px] rounded-[20px] bg-[#FFB380] p-[16px] mx-auto flex items-center relative">
                <div className="w-[56px] h-[56px] flex items-center justify-center bg-[#FF9B57] rounded-[20px] text-[24px] font-medium">{ selfRank > 0 ? '#' + selfRank.toLocaleString() : '' }</div>
                <div className="ml-[16px] font-rubik text-[16px] font-medium leading-[24px] flex-1">You are doing better than { Math.floor((userCount - selfRank) / (userCount - 1) * 100) }% of other players!</div>
                <img className="absolute h-[95px] top-0 right-0 translate-x-[50px]" src="/imgs/print.png" alt="" />
            </div>
            <div className="w-[318px] mx-auto grid grid-cols-3 mt-[30px]">
                <div className="flex flex-col items-center justify-end">
                    <Avatar userid={users[1]?.userid} className="border border-secondary" width={56} height={56} username={users[1]?.username} />
                    <div className="w-[92px] font-caveat px-1 text-center text-[20px] leading-[30px] text-ellipsis whitespace-nowrap overflow-clip mt-[16px]">{users[1]?.firstname || '---'}</div>
                    <div className="bg-primary rounded-[12px] w-[92px] h-[34px] flex items-center justify-center font-rubik text-[12px] font-medium">
                        {type == "week" && users[1]?.weeklyScore?.toLocaleString()}
                        {type == "total" && users[1]?.totalScore?.toLocaleString()}
                    </div>
                    <div className="border-b-[16px] border-b-[#96DBFE] border-l-[16px] border-l-transparent mt-[9px] w-full" />
                    <div className="h-[148px] bg-primary w-full text-center leading-[112px] text-[80px] font-bold font-inter">2</div>
                </div>
                <div className="relative flex flex-col items-center">
                    <img width={35} height={28} className="absolute top-0 z-10 -translate-x-1/2 -translate-y-1/2 left-1/2" src="/imgs/crown.svg" alt="crown" />
                    <Avatar userid={users[0]?.userid} className="border border-secondary" width={56} height={56} username={users[0]?.username} />
                    <div className="w-[92px] font-caveat px-1 text-center text-[20px] leading-[30px] text-ellipsis whitespace-nowrap overflow-clip mt-[16px]">{users[0]?.firstname || '---'}</div>
                    <div className="bg-primary rounded-[12px] w-[92px] h-[34px] flex items-center justify-center font-rubik text-[12px] font-medium">
                        {type == "week" && users[0]?.weeklyScore?.toLocaleString()}
                        {type == "total" && users[0]?.totalScore?.toLocaleString()}
                    </div>
                    <div className="border-b-[16px] border-b-[#96DBFE] border-x-[16px] border-x-transparent mt-[9px] w-full" />
                    <div className="h-[180px] bg-gradient-to-b from-[#39BDFF] to-[#64DDFF] w-full text-center leading-[140px] text-[100px] font-bold font-inter">1</div>
                </div>
                <div className="flex flex-col items-center justify-end">
                    <Avatar userid={users[2]?.userid} className="border border-secondary" width={56} height={56} username={users[2]?.username} />
                    <div className="w-[92px] font-caveat px-1 text-center text-[20px] leading-[30px] text-ellipsis whitespace-nowrap overflow-clip mt-[16px]">{users[2]?.firstname || '---'}</div>
                    <div className="bg-primary rounded-[12px] w-[92px] h-[34px] flex items-center justify-center font-rubik text-[12px] font-medium">
                        {type == "week" && users[2]?.weeklyScore.toLocaleString()}
                        {type == "total" && users[2]?.totalScore.toLocaleString()}
                    </div>
                    <div className="border-b-[16px] border-b-[#96DBFE] border-r-[16px] border-r-transparent mt-[9px] w-full" />
                    <div className="h-[116px] bg-primary w-full text-center leading-[84px] text-[60px] font-bold font-inter">3</div>
                </div>
            </div>
            {/* <div className="flex justify-center gap-[12px] mt-5">
                <div className="flex-col items-center justify-center px-[13px] py-[8px] bg-primary rounded-xl w-[102px]">
                    <div className="font-semibold text-center font-inter text-[16px] leading-[19px]">#{self?.token}</div>
                    <div className="flex items-center gap-1 text-[12px] mt-[3px] leading-[16px] text-center">Your Tokens <img width={3} height={5} src="/imgs/arrow.svg" alt="" /></div>
                </div>
                <div className="flex-col items-center justify-center px-[13px] py-[8px] bg-primary rounded-xl w-[102px]">
                    <div className="font-semibold text-center font-inter text-[16px] leading-[19px]">#{self?.onion}</div>
                    <div className="flex items-center gap-1 text-[12px] mt-[3px] leading-[16px] text-center">Your Catnip <img width={3} height={5} src="/imgs/arrow.svg" alt="" /></div>
                </div>
            </div> */}
            <div className="relative w-[359px] mx-auto -mt-[10px] p-[16px] bg-[#CBEAFA] rounded-[33px]">
                <img src="/imgs/wave-circle.svg" className="absolute w-[50px] top-0 -translate-y-[8px] left-1/2 -translate-x-1/2" alt="" />
                <div className="flex flex-col gap-[16px] h-[314px] overflow-y-auto">
                    {users.slice(3).map((item, index) =>
                        <div key={index} className={`flex items-center gap-[16px] pt-[16px] pb-[20px] px-[16px] font-inter bg-white border rounded-[20px] ${ user.id == item.userid ? 'border-yellow-500' : 'border-transparent' }`}>
                            <div className="text-[12px] font-rubik font-medium text-[#858494] w-[24px] h-[24px] border border-[#E6E6E6] rounded-full flex items-center justify-center">{index + 4}</div>
                            <div className="flex gap-[16px] items-center">
                                <Avatar userid={item.userid} width={56} height={56} className="border border-[#C4C4C4]" username={item?.username} />
                                <div className="flex flex-col gap-[3px]">
                                    <div className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[150px] font-medium font-rubik text-[16px] text-[#0C092A]">{item.firstname}</div>
                                    <div className="text-[#858494] text-[14px]">
                                        {type == "week" && item.weeklyScore.toLocaleString()}
                                        {type == "total" && item.totalScore.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {
                        users.length <= 3 && <p className="text-center">No users to display</p>
                    }
                </div>
            </div>
        </div>
    )
}