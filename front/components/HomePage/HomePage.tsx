import {HeroSection} from "@/components/HomePage/components/HeroSection";
import {Navbar} from "@/components/HomePage/components/Navbar";
import {BentoDemo} from "@/components/HomePage/components/BentoGrid";

export const HomePage = () => {
    return (
        <div className="h-full w-full">
            <Navbar />
            <HeroSection />
            <BentoDemo/>
        </div>
    );
}