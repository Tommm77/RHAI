import {Navbar} from "@/components/HomePage/components/Navbar";
import AnimatedGradientText from "../magicui/animated-gradient-text";
import { Profiltabs } from "./components/ProfilTabs";
import { Avatar } from "@radix-ui/react-avatar";

export const ProfilHome = () => {
    return (
        <div className="h-full w-full">
            <Navbar />
            <AnimatedGradientText>
                <div className="flex flex-col justify-center items-center w-screen h-screen">
                    <Profiltabs />
                </div>
            </AnimatedGradientText>
        </div>
    );
}