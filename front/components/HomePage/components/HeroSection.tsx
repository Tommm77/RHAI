"use client";

import {useState, ChangeEvent} from 'react';
import {ChevronRightIcon, Send, Upload} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import AnimatedGradientButton from "@/components/magicui/animated-gradient-button";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import {NeonGradientCard} from "@/components/magicui/neon-gradient-card";
import {cn} from "@/lib/utils";

export const HeroSection = () => {
    const [selectedFileName, setSelectedFileName] = useState("Pas de fichier choisi");

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFileName(file.name);
        } else {
            setSelectedFileName("Pas de fichier choisi");
        }
    };

    return (
        <div className="h-full w-full mt-48">
            <div className="container px-4 md:px-6 z-10 relative">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="z-10 flex items-center justify-center mb-5">
                        <AnimatedGradientButton className="cursor-pointer">
                            🚀 <hr className="mx-2 h-4 w-[1px] shrink-0"/>{" "}
                            <span
                                className={cn(
                                    `inline animate-gradient bg-gradient-to-r from-[#6157ff] via-[#EE49FD] to-[#6157ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                                )}
                            >
          Bienvenue a la beta
        </span>
                            <ChevronRightIcon
                                className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"/>
                        </AnimatedGradientButton>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-center items-center space-x-5">
                            <AnimatedGradientText>
                                <h1 className="animate-gradient bg-gradient-to-r from-[#6157ff] via-[#EE49FD] to-[#6157ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center -mt-5 sm:-mt-10 pb-2">
                                    Envoyer
                                </h1>
                            </AnimatedGradientText>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center -mt-5 sm:-mt-10 pb-2">
                                Votre
                            </h1>
                            <AnimatedGradientText>
                                <h1 className="animate-gradient bg-gradient-to-r from-[#6157ff] via-[#EE49FD] to-[#6157ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center -mt-5 sm:-mt-10 pb-2">
                                    CV
                                </h1>
                            </AnimatedGradientText>
                        </div>
                        <div className="flex justify-center items-center space-x-5">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center -mt-5 sm:-mt-10">
                                Analyser par
                            </h1>
                            <AnimatedGradientText>
                                <h1 className="animate-gradient bg-gradient-to-r from-[#6157ff] via-[#EE49FD] to-[#6157ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center -mt-5 sm:-mt-10">
                                    AI
                                </h1>
                            </AnimatedGradientText>
                        </div>
                        <p className="mx-auto max-w-[800px] md:text-xl text-accent-foreground">
                            Notre IA simplifie le processus de candidature et évalue votre CV avec précision.
                        </p>
                    </div>
                    <div className="w-full max-w-5xl space-y-2 pt-2">
                        <div className="h-fit flex items-center justify-center">
                            <NeonGradientCard className="w-2/3 h-[3.5rem]">
                                <form className="flex items-center -mt-1">
                                    <Button className="w-48 h-14 -ml-1 rounded-l-2xl" size="icon" type="button">
                                        Choisir Fichier
                                        <Upload className="ml-5 w-5 h-5"/>
                                        <span className="sr-only">Send</span>
                                        <input
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            type="file"
                                            name="file"
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                    <Input
                                        className="pl-4 max-w-5xl flex-1 rounded-r-2xl h-12 bg-card text-accent-foreground"
                                        placeholder="Pas de fichier choisi"
                                        type="text"
                                        value={selectedFileName}
                                        readOnly
                                    />
                                    <Button className="w-14 h-14 absolute top-0 right-0 rounded-r-2xl" size="icon" type="submit">
                                        <Send/>
                                        <span className="sr-only">Send</span>
                                    </Button>
                                </form>
                            </NeonGradientCard>
                        </div>
                        <p className="text-xs text-accent-foreground">
                            Inscrivez-vous pour débloquer des fonctionnalités exclusives.
                            <Link className="underline underline-offset-2" href="#">
                                Termes et conditions
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
