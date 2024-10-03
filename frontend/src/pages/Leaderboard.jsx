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
    },[type])
    
    const handleClickType = (type) => (e) => {
        e.preventDefault();
        setType(type);
    }

    return (
        <div className="flex flex-col mb-[30px]">
            <div className="mx-[26px]">
                <div className="flex justify-center -translate-x-[30px] translate-y-[42px]">
                    <img width={35} height={28} src="/imgs/crown.svg" alt="crown" />
                </div>
                <div className="flex">
                    <div className="flex justify-center items-end flex-1 translate-y-[70px]">
                        <div className="p-[4px] rounded-full bg-gradient-to-b from-[#4474A2] to-[#0E1932]">
                            <Avatar userid={users[1]?.userid} width={60} height={60} username={users[1]?.username} />
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-1 translate-y-[28px]">
                        <div className="p-[4px] rounded-full bg-gradient-to-b from-[#FEC63C] to-[#C85929]">
                            <Avatar userid={users[0]?.userid} width={74} height={74} username={users[0]?.username} />
                        </div>
                    </div>
                    <div className="flex justify-center items-end flex-1 translate-y-[70px]">
                        <div className="p-[4px] rounded-full bg-gradient-to-b from-[#3E4ECA] to-[#231450]">
                            <Avatar userid={users[2]?.userid} width={60} height={60} username={users[2]?.username} />
                        </div>
                    </div>
                </div>
                <div className="flex items-end">
                    <div className="flex flex-col items-center justify-center flex-1 gap-1 pt-[20px] pb-2 bg-white/[0.21] rounded-l-[12px]">
                        <div className="flex items-center justify-center w-5 h-5 text-xs -translate-y-[6px] bg-gradient-to-t from-[#0e1932] to-[#4474a2] rotate-45 rounded-[6px]"><span className="-rotate-45">2</span></div>
                        <div className="text-center text-[12px] font-light font-inter overflow-ellipsis overflow-hidden whitespace-nowrap w-[80px]">{users[1]?.firstname || '---'}</div>
                        <div className="text-[14px] font-semibold mt-[4px]">
                            {type == "week" && (users[1]?.weeklyScore || '---')}
                            {type == "month" && (users[1]?.monthlyScore || '---')}
                            {type == "total" && (users[1]?.totalScore || '---')}
                        </div>
                        <div className="flex items-center gap-1 text-[14px] font-semibold text-primary mt-[4px]">
                            <img width={9} height={10} src="/imgs/token.png" alt="" />
                            <span>
                                {type == "week" && (users[1]?.weeklyScore || '---')}
                                {type == "month" && (users[1]?.monthlyScore || '---')}
                                {type == "total" && (users[1]?.totalScore || '---')}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 gap-1 pt-[32px] pb-[32px] bg-white rounded-t-[30px] text-primary">
                        <div className="flex items-center justify-center w-5 h-5 text-xs -translate-y-[16px] text-white bg-gradient-to-t from-[#c85929] to-[#fec63c] rotate-45 rounded-[6px]"><span className="-rotate-45">1</span></div>
                        <div className="text-center text-[12px] font-light font-inter overflow-ellipsis overflow-hidden whitespace-nowrap w-[80px]">{users[0]?.firstname}</div>
                        <div className="font-semibold mt-[4px]">
                            {type == "week" && users[0]?.weeklyScore}
                            {type == "month" && users[0]?.monthlyScore}
                            {type == "total" && users[0]?.totalScore}
                        </div>
                        <div className="flex items-center gap-1 text-[14px] font-semibold mt-[10px]">
                            <img width={9} height={10} src="/imgs/token.png" alt="" />
                            <span>
                                {type == "week" && users[0]?.weeklyScore}
                                {type == "month" && users[0]?.monthlyScore}
                                {type == "total" && users[0]?.totalScore}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 gap-1 pt-[20px] pb-2 bg-white/[0.21] rounded-r-[12px]">
                        <div className="flex items-center justify-center w-5 h-5 text-xs -translate-y-[6px] bg-gradient-to-t from-[#231450] to-[#3e4eca] rotate-45 rounded-[6px]"><span className="-rotate-45">3</span></div>
                        <div className="text-center text-[12px] font-light font-inter overflow-ellipsis overflow-hidden whitespace-nowrap w-[80px]">{users[2]?.firstname || '---'}</div>
                        <div className="text-[14px] font-semibold mt-[4px]">
                            {type == "week" && (users[2]?.weeklyScore || '---')}
                            {type == "month" && (users[2]?.monthlyScore || '---')}
                            {type == "total" && (users[2]?.totalScore || '---')}
                        </div>
                        <div className="flex items-center gap-1 text-[14px] font-semibold text-primary mt-[4px]">
                            <img width={9} height={10} src="/imgs/token.png" alt="" />
                            <span>
                                {type == "week" && (users[2]?.weeklyScore || '---')}
                                {type == "month" && (users[2]?.monthlyScore || '---')}
                                {type == "total" && (users[2]?.totalScore || '---')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-[12px] mt-5">
                <div className="flex-col items-center justify-center px-[13px] py-[8px] bg-primary rounded-xl w-[102px]">
                    <div className="font-semibold text-center font-inter text-[16px] leading-[19px]">#{self?.token}</div>
                    <div className="flex items-center gap-1 text-[12px] mt-[3px] leading-[16px] text-center">Your Tokens <img width={3} height={5} src="/imgs/arrow.svg" alt="" /></div>
                </div>
                <div className="flex-col items-center justify-center px-[13px] py-[8px] bg-primary rounded-xl w-[102px]">
                    <div className="font-semibold text-center font-inter text-[16px] leading-[19px]">#{self?.onion}</div>
                    <div className="flex items-center gap-1 text-[12px] mt-[3px] leading-[16px] text-center">Your ONION <img width={3} height={5} src="/imgs/arrow.svg" alt="" /></div>
                </div>
            </div>
            <div className="flex items-end justify-center gap-2 font-poppins mt-[20px]">
                <div className="flex-1 ml-2 border-t border-white -translate-y-[10px]" />
                <span>total</span>
                <div className="text-[30px] font-bold leading-none text-primary"><CountUp end={userCount} formatter={(val) => Math.floor(val).toLocaleString()} isCounting={isCounting} duration={0.5} /></div>
                <span>users</span>
                <div className="flex-1 mr-2 border-t border-white -translate-y-[10px]" />
            </div>
            <div className="flex justify-between items-center py-[4px] mx-[32px] mt-[20px] mb-[30px] bg-white/25 rounded-[10px] font-inter text-[12px]">
                <div onClick={handleClickType("week")} className={`flex-1 text-center transition-all duration-300 font-semibold py-[10px] rounded-lg ml-1 hover:bg-primary ${type == "week" ? 'bg-primary cursor-not-allowed' : 'cursor-pointer'}`}>Weekly</div>
                <div onClick={handleClickType("month")} className={`flex-1 text-center transition-all duration-300 font-semibold py-[10px] rounded-lg mx-1 hover:bg-primary ${type == "month" ? 'bg-primary cursor-not-allowed' : 'cursor-pointer'}`}>Monthly</div>
                <div onClick={handleClickType("total")} className={`flex-1 text-center transition-all duration-300 font-semibold py-[10px] rounded-lg mr-1 hover:bg-primary ${type == "total" ? 'bg-primary cursor-not-allowed' : 'cursor-pointer'}`}>All time</div>
            </div>
            <div className="divide-y-[1px] divide-white/50 max-h-[200px] overflow-y-auto">
                { users.slice(3).map((item, index) => 
                    <div key={index} className="flex items-center mx-[32px] justify-between px-3 py-2 font-inter">
                        <div className="flex gap-2">
                            <Avatar userid={item.userid} width={35} height={35} username={item?.username} />
                            <div className="flex flex-col justify-between">
                                <div className="flex text-[12px] items-center"><span className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[80px]">{item.firstname}</span> <img src="/imgs/token.png" width={9} height={10} className="mr-[5px] ml-[5px]" alt="" />
                                    <span className="font-semibold text-primary">{item.onion}</span>
                                </div>
                                <div className="text-white/[0.13] text-[12px]">
                                    {type == "week" && item.weeklyScore}
                                    {type == "month" && item.monthlyScore}
                                    {type == "total" && item.totalScore}
                                </div>
                            </div>
                        </div>
                        <div className="text-[12px] font-bold">{index+4}</div>
                    </div>
                )}
                {
                    users.length <= 3 && <p className="text-center">No users to display</p>
                }
            </div>
        </div>
    )
}