import {Navbar} from "@/components/HomePage/components/Navbar";
import {CVList} from "@/components/RH/components/CVList";
import {BentoDemo} from "@/components/RH/components/BentoGrid";
export const RHHome = () => {
    return (
        <div className="h-full w-full">
            <Navbar />
            <CVList />
            <BentoDemo />
        </div>
    );
}