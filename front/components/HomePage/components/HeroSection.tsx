"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { ChevronRightIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnimatedGradientButton from "@/components/magicui/animated-gradient-button";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

export const HeroSection = () => {
    const [selectedCV, setSelectedCV] = useState<File | null>(null);
    const [selectedLetter, setSelectedLetter] = useState<File | null>(null);
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
        const file = event.target.files?.[0];
        setFile(file || null);
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = (reader.result as string).split(',')[1];
                resolve(base64String);
            };
            reader.onerror = error => reject(error);
        });
    };

    const ScoringFile = async (file: File) => {
        const base64File = await convertFileToBase64(file);
        const url = 'https://rhai-api.vercel.app/api/evaluate_cv/'
        //console.log(`Base64 ${fileType}:`, base64File);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ["pdf"]: base64File }),
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de l'envoi du fichier à ${url}`);
        }

        const data = await response.json();
        console.log(`Response data for evaluate PDF:`, data);
        return data;
    }

    const uploadFile = async (file: File, url: string, fileType: 'cv' | 'lettre') => {
        const base64File = await convertFileToBase64(file);
        console.log(`Base64 ${fileType}:`, base64File);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ [fileType]: base64File }),
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de l'envoi du fichier à ${url}`);
        }

        const data = await response.json();
        console.log(`Response data for ${fileType}:`, data);
        return data;
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            let cvId: number | null = null;
            let letterId: number | null = null;

            if (selectedCV) {
                const cvResponse = await uploadFile(selectedCV, 'https://rhai-api.vercel.app/api/cvs/', 'cv');
                cvId = cvResponse.id_cv;
            }

            if (selectedLetter) {
                const letterResponse = await uploadFile(selectedLetter, 'https://rhai-api.vercel.app/api/motivations/', 'lettre');
                letterId = letterResponse.id_m;
            }

            const candidatureBody = {
                email,
                cv: cvId,
                lettre: letterId,
            };
            console.log('Candidature body:', candidatureBody); // Log the candidature body

            const candidatureResponse = await fetch('https://rhai-api.vercel.app/api/candidatures/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(candidatureBody),
            });

            if (candidatureResponse.ok) {
                alert('Candidature envoyée avec succès !');
            } else {
                alert("Erreur lors de l'envoi de la candidature.");
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="h-full w-full mt-20">
            <div className="container px-4 md:px-6 z-10 relative">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="z-10 flex items-center justify-center mb-5">
                        <AnimatedGradientButton className="cursor-pointer opacity-70 mb-2" backgroundColor="#1A1924">
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
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-2/3 h-[3.5rem]">Envoyer sa candidature</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-lg">
                                    <DialogTitle>Envoyer sa candidature</DialogTitle>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Adresse email
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
                                                CV (optionnel)
                                            </label>
                                            <Input
                                                id="cv"
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) => handleFileChange(e, setSelectedCV)}
                                                className="mt-1 block w-full"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="letter" className="block text-sm font-medium text-gray-700">
                                                Lettre de motivation (optionnel)
                                            </label>
                                            <Input
                                                id="letter"
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) => handleFileChange(e, setSelectedLetter)}
                                                className="mt-1 block w-full"
                                            />
                                        </div>
                                        <Button type="submit" className="w-full">
                                            Envoyer
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
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
