import { useState, useLayoutEffect, useEffect } from "react";
import { createContext, useContext } from "react";
import { useInitData } from "@telegram-apps/sdk-react";
import API from "@/libs/api";
// import Splash from "@/components/Splash";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const { user } = useInitData();
    // const [showSplash, setShowSplash] = useState(true);
    const [muted, setMuted] = useState(localStorage.getItem('volume') === "off");
    const [isAuthenticatied, setAuthenticated] = useState(false);

    // const handleClickSplash = () => {
    //     setShowSplash(false);
    // }

    useEffect(() => {
        Howler.mute(muted);
        localStorage.setItem('volume', muted ? "off" : "on");
    }, [muted]);

    const toggleMusic = () => {
        setMuted(prev => !prev);
    }

    useLayoutEffect(() => {        
        API.post('/auth/login', { userid: user.id }).then((res) => {
            localStorage.setItem('token', `Bearer ${res.data.token}`);
            setAuthenticated(true);
            console.log('User logined:', user.username, user.firstName, user.lastName);
        })
        .catch(console.error);

        const audio = new Howl({
            src: ['/mp3/background.mp3'],
            autoplay: true,
            loop: true,
            volume: 1
        });

        audio.play();

        return () => audio.unload();
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticatied, muted, toggleMusic }}>
            {/* showSplash ? <Splash onClick={handleClickSplash} /> : children */}
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;