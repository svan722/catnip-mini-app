import { Link } from "@/components/Link";
import { useLocation } from "react-router-dom";

export default function Footer() {
    const { pathname } = useLocation();

    return (
        <div className="footer fixed bottom-0 h-[80px] w-[calc(100vw+18px)] -translate-x-[9px] bg-white rounded-t-[32px] grid grid-cols-5 pt-[4px] px-[39px]">
            <div className="flex flex-col items-center justify-start">
                <Link to="/home" className={`w-[44px] h-[44px] rounded-full flex items-center justify-center transition-transform duration-300 ${ pathname === '/' || pathname === '/home' ? 'stroke-white bg-gradient-to-tr from-primary to-[#64DDFF] -translate-y-[10px] outline outline-[5px] outline-white' : 'hover:scale-125 stroke-secondary hover:stroke-primary'}`}>
                    <svg height="32" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31.5 27.9668V20.1503C31.5 18.9394 30.9604 17.7925 30.0301 17.0265L25.0301 12.9093C23.5577 11.6969 21.4423 11.6969 19.9699 12.9093L14.9699 17.0265C14.0396 17.7925 13.5 18.9394 13.5 20.1503V27.9668C13.5 30.1943 15.2909 32 17.5 32H27.5C29.7091 32 31.5 30.1943 31.5 27.9668Z" strokeWidth="1.5" strokeLinejoin="round"/>
                        <path d="M20.5 28H24.5" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </Link>
                <div className="text-[12px] font-manrope font-medium leading-none text-center text-secondary">Home</div>
            </div>
            <div className="flex flex-col items-center justify-start">
                <Link to="/invite" className={`w-[44px] h-[44px] rounded-full flex items-center justify-center transition-transform duration-300 ${ pathname === '/invite' ? 'fill-white bg-gradient-to-tr from-primary to-[#64DDFF] -translate-y-[10px] outline outline-[5px] outline-white' : 'hover:scale-125 fill-secondary hover:fill-primary'}`}>
                    <svg width="21" height="23" viewBox="0 0 21 23" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 10.0625C9.57184 10.0625 8.6817 9.68387 8.02539 9.00991C7.36908 8.33596 7.00037 7.42187 7.00037 6.46875C7.00037 5.51563 7.36908 4.60154 8.02539 3.92759C8.6817 3.25363 9.57184 2.875 10.5 2.875C11.4282 2.875 12.3183 3.25363 12.9746 3.92759C13.6309 4.60154 13.9996 5.51563 13.9996 6.46875C13.9996 7.42187 13.6309 8.33596 12.9746 9.00991C12.3183 9.68387 11.4282 10.0625 10.5 10.0625ZM10.5 4.3125C9.33812 4.3125 8.40022 5.27562 8.40022 6.46875C8.40022 7.66187 9.33812 8.625 10.5 8.625C11.6619 8.625 12.5998 7.66187 12.5998 6.46875C12.5998 5.27562 11.6619 4.3125 10.5 4.3125Z" />
                        <path d="M18.8991 15.8125C18.5071 15.8125 18.1992 15.4963 18.1992 15.0938C18.1992 14.6912 18.5071 14.375 18.8991 14.375C19.2911 14.375 19.599 14.0588 19.599 13.6562C19.599 12.7031 19.2303 11.789 18.574 11.1151C17.9177 10.4411 17.0276 10.0625 16.0994 10.0625H14.6996C14.3076 10.0625 13.9996 9.74625 13.9996 9.34375C13.9996 8.94125 14.3076 8.625 14.6996 8.625C15.8614 8.625 16.7993 7.66187 16.7993 6.46875C16.7993 5.27562 15.8614 4.3125 14.6996 4.3125C14.3076 4.3125 13.9996 3.99625 13.9996 3.59375C13.9996 3.19125 14.3076 2.875 14.6996 2.875C15.6277 2.875 16.5179 3.25363 17.1742 3.92759C17.8305 4.60154 18.1992 5.51563 18.1992 6.46875C18.1992 7.36 17.8912 8.165 17.3593 8.7975C19.445 9.3725 20.9989 11.3275 20.9989 13.6562C20.9989 14.8494 20.061 15.8125 18.8991 15.8125ZM2.1009 15.8125C0.939021 15.8125 0.00112152 14.8494 0.00112152 13.6562C0.00112152 11.3275 1.54096 9.3725 3.64073 8.7975C3.12279 8.165 2.80082 7.36 2.80082 6.46875C2.80082 5.51563 3.16953 4.60154 3.82584 3.92759C4.48215 3.25363 5.37229 2.875 6.30045 2.875C6.69241 2.875 7.00037 3.19125 7.00037 3.59375C7.00037 3.99625 6.69241 4.3125 6.30045 4.3125C5.13857 4.3125 4.20067 5.27562 4.20067 6.46875C4.20067 7.66187 5.13857 8.625 6.30045 8.625C6.69241 8.625 7.00037 8.94125 7.00037 9.34375C7.00037 9.74625 6.69241 10.0625 6.30045 10.0625H4.9006C3.97244 10.0625 3.0823 10.4411 2.42599 11.1151C1.76968 11.789 1.40097 12.7031 1.40097 13.6562C1.40097 14.0588 1.70894 14.375 2.1009 14.375C2.49286 14.375 2.80082 14.6912 2.80082 15.0938C2.80082 15.4963 2.49286 15.8125 2.1009 15.8125ZM14.6996 20.125H6.30045C5.13857 20.125 4.20067 19.1619 4.20067 17.9688V16.5312C4.20067 13.7569 6.39844 11.5 9.10015 11.5H11.8999C14.6016 11.5 16.7993 13.7569 16.7993 16.5312V17.9688C16.7993 19.1619 15.8614 20.125 14.6996 20.125ZM9.10015 12.9375C8.17199 12.9375 7.28185 13.3161 6.62554 13.9901C5.96923 14.664 5.60052 15.5781 5.60052 16.5312V17.9688C5.60052 18.3713 5.90849 18.6875 6.30045 18.6875H14.6996C15.0915 18.6875 15.3995 18.3713 15.3995 17.9688V16.5312C15.3995 15.5781 15.0308 14.664 14.3745 13.9901C13.7182 13.3161 12.828 12.9375 11.8999 12.9375H9.10015Z" />
                    </svg>
                </Link>
                <div className="text-[12px] font-manrope font-medium leading-none text-center text-secondary">Invite</div>
            </div>
            <div className="flex flex-col items-center justify-start">
                <Link to="/catnip" className={`w-[44px] h-[44px] rounded-full flex items-center justify-center transition-transform duration-300 ${ pathname === '/catnip' || pathname === '/boost' ? 'fill-white bg-gradient-to-tr from-primary to-[#64DDFF] -translate-y-[10px] outline outline-[5px] outline-white' : 'hover:scale-125 fill-secondary hover:fill-primary'}`}>
                    <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M20.8432 6.83085L24.0865 10.0858C24.3082 10.3075 24.3082 10.6808 24.0749 10.9025L20.8315 14.1575C20.4699 14.5308 19.8399 14.2742 19.8399 13.7492V11.6608H12.8282C12.1865 11.6608 11.6615 11.1358 11.6615 10.4942C11.6615 9.85252 12.1865 9.32752 12.8282 9.32752H19.8515V7.23918C19.8515 6.72585 20.4815 6.45752 20.8432 6.83085ZM3.91488 17.0858L7.15822 13.8308C7.51988 13.4575 8.14988 13.7142 8.14988 14.2392V16.3275H15.1615C15.8032 16.3275 16.3282 16.8525 16.3282 17.4942C16.3282 18.1358 15.8032 18.6608 15.1615 18.6608H8.14988V20.7608C8.14988 21.2742 7.51988 21.5425 7.15822 21.1692L3.91488 17.9142C3.69322 17.6808 3.69322 17.3192 3.91488 17.0858Z" />
                    </svg>
                </Link>
                <div className="text-[12px] font-manrope font-medium leading-none text-center text-secondary">Swap</div>
            </div>
            <div className="flex flex-col items-center justify-start">
                <Link to="/leaderboard" className={`w-[44px] h-[44px] rounded-full flex items-center justify-center transition-transform duration-300 ${ pathname === '/leaderboard' ? 'fill-white bg-gradient-to-tr from-primary to-[#64DDFF] -translate-y-[10px] outline outline-[5px] outline-white' : 'hover:scale-125 fill-secondary hover:fill-primary'}`}>
                    <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13 5.41666C13.8342 5.41666 14.5167 6.09916 14.5167 6.93332V19.0667C14.5167 19.9008 13.8342 20.5833 13 20.5833C12.1658 20.5833 11.4833 19.9008 11.4833 19.0667V6.93332C11.4833 6.09916 12.1658 5.41666 13 5.41666ZM6.93333 9.96666H7.15C7.98416 9.96666 8.66666 10.6492 8.66666 11.4833V19.0667C8.66666 19.9008 7.98416 20.5833 7.15 20.5833H6.93333C6.09916 20.5833 5.41666 19.9008 5.41666 19.0667V11.4833C5.41666 10.6492 6.09916 9.96666 6.93333 9.96666ZM20.5833 15.6C20.5833 14.7658 19.9008 14.0833 19.0667 14.0833C18.2325 14.0833 17.55 14.7658 17.55 15.6V19.0667C17.55 19.9008 18.2325 20.5833 19.0667 20.5833C19.9008 20.5833 20.5833 19.9008 20.5833 19.0667V15.6Z" />
                    </svg>
                </Link>
                <div className="text-[12px] font-manrope font-medium leading-none text-center text-secondary">Leaderboard</div>
            </div>
            <div className="flex flex-col items-center justify-start">
                <Link to="/earn" className={`w-[44px] h-[44px] rounded-full flex items-center justify-center transition-transform duration-300 ${ pathname === '/earn' ? 'stroke-white bg-gradient-to-tr from-primary to-[#64DDFF] -translate-y-[10px] outline outline-[5px] outline-white' : 'hover:scale-125 stroke-secondary hover:stroke-primary'}`}>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.76922 18C13.3461 18 16.6154 16.3811 16.6154 12.7771C16.6154 8.86054 14.6538 6.24908 10.7308 4.29015L12.2738 2.30508C12.3524 2.17487 12.3951 2.02615 12.3975 1.87408C12.3999 1.72201 12.362 1.57202 12.2876 1.43939C12.2131 1.30675 12.1049 1.19621 11.9738 1.11903C11.8428 1.04184 11.6936 1.00077 11.5415 1H5.99691C5.84515 1.00158 5.69648 1.04315 5.56591 1.12052C5.43534 1.19789 5.32747 1.30832 5.2532 1.44069C5.17893 1.57305 5.14088 1.72265 5.14288 1.87441C5.14488 2.02617 5.18687 2.17472 5.2646 2.30508L6.80768 4.30323C2.8846 6.27523 0.923065 8.88669 0.923065 12.8032C0.923065 16.3811 4.1923 18 8.76922 18Z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.5778 9.24631C10.4808 8.96942 10.3 8.72961 10.0605 8.56018C9.821 8.39075 9.53468 8.30011 9.24131 8.30084H8.14546C7.83322 8.30023 7.53179 8.41515 7.29922 8.62349C7.06665 8.83183 6.91938 9.11884 6.88577 9.42927C6.85216 9.7397 6.93459 10.0516 7.11719 10.3049C7.29978 10.5582 7.56963 10.7349 7.87477 10.8012L9.54469 11.1673C9.88497 11.2432 10.1853 11.4418 10.3884 11.7252C10.5915 12.0086 10.683 12.3569 10.6454 12.7035C10.6079 13.0501 10.4439 13.3707 10.1849 13.6041C9.92587 13.8374 9.58994 13.9671 9.24131 13.9684H8.29846C7.68123 13.9684 7.15685 13.5735 6.962 13.0242M8.76923 8.30084V6.88461M8.76923 15.3846V13.9684" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                <div className="text-[12px] font-manrope font-medium leading-none text-center text-secondary">Earn</div>
            </div>
        </div>
    )
}