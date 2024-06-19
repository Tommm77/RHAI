"use client";
import Image from "next/image";
import { LoginModal } from "./LoginModal";
import Link from "next/link";
import useAuth from "@/utils/auth";
import { removeCookie } from "@/utils/cookies";
import { Button } from "@/components/ui/button";


export const Navbar = () => {

    const isAuthenticated = useAuth();

    const handleLogout = () => {
        removeCookie(null, "token");
        window.location.reload();
    };

    return (
        <div className="h-16 w-full border-b">
            <div className="flex items-center justify-between h-full px-4">
                <Link href="/" className="flex space-x-5 items-center ml-5">
                    <Image src="/assets/logo2.png" width="60" height="60" alt="logo"/>
                </Link>
                <div className="flex">
                    <div className="flex space-x-5 items-center ml-5">
                        {isAuthenticated && (
                            <>
                            <div className="flex space-x-5 items-center ml-5">
                                <Link href="/RH" className="rounded-2xl">
                                <p>Espace RH</p>
                                </Link>
                            </div>
                            <div className="flex space-x-5 items-center ml-5">
                                <Link href="/Profile" className="rounded-2xl">
                                <p>Profil</p>
                                </Link>
                            </div>

                            <Button className="rounded-2xl" onClick={handleLogout}>Log Out</Button>
                            </>
                        )}
                    </div>
                        {!isAuthenticated && (
                            <>
                                <div className="flex gap-4 mr-5 ml-5">
                                    <LoginModal/>
                                </div>
                            </>
                        )}
                </div>
            </div>
        </div>
    );
}