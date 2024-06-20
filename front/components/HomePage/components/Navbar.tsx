"use client";

import Image from "next/image";
import { LoginModal } from "./LoginModal";
import Link from "next/link";
import useAuth from "@/utils/auth";
import { removeCookie } from "@/utils/cookies";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import cookie from "cookie";

export const Navbar = () => {
    const isAuthenticated = useAuth();
    const [avatarSrc, setAvatarSrc] = useState<string>("");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fetchProfile = async () => {
                const cookies = cookie.parse(document.cookie || "");
                const id_p = cookies.id_p;

                if (id_p) {
                    const response = await fetch(`https://rhai-api.vercel.app/api/profils/${id_p}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setAvatarSrc(data.photo_profil || "https://github.com/shadcn.png");
                    } else {
                        console.error("Erreur lors de la récupération du profil.");
                    }
                }
            };

            if (isAuthenticated) {
                fetchProfile().then(r => r);
            }
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        removeCookie(null, "id_p");
        removeCookie(null, "role");
        window.location.href = "/";
    };

    const authAdmin = () => {
        if (typeof window !== 'undefined') {
            const cookies = cookie.parse(document.cookie || "");
            const role = cookies.role;

            if (role) {
                if (role === "admin") {
                    return true;
                }
            }
        }
        return false;
    }

    return (
        <div className="h-16 w-full border-b">
            <div className="flex items-center justify-between h-full px-4">
                <Link href="/" className="flex space-x-5 items-center ml-5">
                    <Image src="/assets/logo2.png" width="60" height="60" alt="logo" />
                </Link>
                <div className="flex">
                    <div className="flex space-x-20 items-center ml-5">
                        {typeof window !== 'undefined' && authAdmin() && (
                            <div className="flex gap-4 mr-5 ml-5">
                                <Link href="/MonitoringAdmin" className="rounded-2xl">
                                    <p>Administration</p>
                                </Link>
                            </div>
                        )}
                        {isAuthenticated ? (
                            <>
                                <div className="flex space-x-2 items-center ml-5">
                                    <Link href="/RH" className="rounded-2xl">
                                        <p>Espace RH</p>
                                    </Link>
                                </div>
                                <div className="flex space-x-2 items-center ml-5">
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage src={avatarSrc} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Link href="/Profile" className="rounded-2xl">
                                        <p>Profil</p>
                                    </Link>
                                </div>

                                <Button className="rounded-2xl" onClick={handleLogout}>Log Out</Button>
                            </>
                        ) : (
                            <div className="flex gap-4 mr-5 ml-5">
                                <LoginModal />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
