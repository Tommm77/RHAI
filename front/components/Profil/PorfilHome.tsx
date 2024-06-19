import {Navbar} from "@/components/HomePage/components/Navbar";
import AnimatedGradientText from "../magicui/animated-gradient-text";
import { Profiltabs } from "./components/ProfilTabs";

export const ProfilHome = () => {
    return (
        <div className="h-full w-full">
            <Navbar />
            <AnimatedGradientText>
                <div className="flex flex-col justify-center items-center w-screen h-screen">
                    <h1 className="animate-gradient bg-gradient-to-r from-[#6157ff] via-[#EE49FD] to-[#6157ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-3xl pb-2">
                        PROFIL
                    </h1>
                    <Profiltabs />
                </div>
            </AnimatedGradientText>
        </div>
    );
}