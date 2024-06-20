import {Navbar} from "@/components/HomePage/components/Navbar";
import AnimatedGradientText from "../magicui/animated-gradient-text";
import {Button} from "@/components/ui/button";
import {Profiltabs} from "@/components/Profil/components/ProfilTabs";

export const MonitoringHome = () => {
    return (
        <div className="h-full w-full">
            <Navbar />
            <div className="flex flex-col justify-center items-center mt-20">
                <div className="flex space-x-10">
                    <Button className="rounded-xl">accéder admin</Button>
                    <Button className="rounded-xl">accéder swagger</Button>
                </div>
            </div>
        </div>
    );
}