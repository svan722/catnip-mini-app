const Splash = ({ onClick }) => {
    return <div onClick={onClick} className="absolute cursor-pointer w-screen h-screen overflow-hidden bg-[url('/imgs/splash.jpg')] bg-cover bg-center" />
}

export default Splash;