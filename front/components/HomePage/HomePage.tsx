import {HeroSection} from "@/components/HomePage/components/HeroSection";
import {Navbar} from "@/components/HomePage/components/Navbar";

export const HomePage = () => {
    return (
        <div className="h-full w-full">
            <Navbar />
            <HeroSection />
        </div>
    );
}