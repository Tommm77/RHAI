import Image from "next/image";
import { LoginModal } from "./LoginModal";
import {LogIn} from "lucide-react";
import {Button} from "@/components/ui/button";


export const Navbar = () => {
    return (
        <div className="h-16 w-full border-b">
            <div className="flex justify-between items-center h-full px-4">
                <div className="flex space-x-5 items-center ml-5">
                    <Image src="/assets/logo2.png" width="60" height="60" alt="logo"/>
                </div>

                <div className="flex space-x-5 items-center ml-5">
                    <Button className="rounded-2xl">
                      <p>Espace RH</p>
                    </Button>
                </div>

                <div className="flex space-x-5 items-center ml-5">
                    <Button className="rounded-2xl">
                      <p>Profil</p>
                    </Button>
                </div>

                <div className="flex gap-4 mr-5">
                    <LoginModal/>
                </div>
            </div>
        </div>
    );

}