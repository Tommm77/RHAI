import {Button} from "@/components/ui/button";
import {LogIn} from "lucide-react";
import Image from "next/image";

export const Navbar = () => {
    return (
        <div className="h-16 w-full border-b">
            <div className="flex justify-between items-center h-full px-4">
                <div className="flex space-x-5 items-center ml-5">
                    <Image src="/assets/logo2.png" width="60" height="60" alt="logo"/>
                </div>
                <div className="flex gap-4 mr-5">
                    <Button className="rounded flex space-x-3">
                        <LogIn size={16} />
                        <p>Sign In</p>
                    </Button>
                </div>
            </div>
        </div>
    );

}