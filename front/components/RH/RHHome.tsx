import {Navbar} from "@/components/HomePage/components/Navbar";
import {CVList} from "@/components/RH/components/CVList";

export const RHHome = () => {
    return (
        <div className="h-full w-full">
            <Navbar />
            <CVList />
        </div>
    );
}