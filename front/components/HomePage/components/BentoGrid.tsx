import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Marquee from "@/components/magicui/marquee";
import { FileTextIcon } from "@radix-ui/react-icons";
import {Brain, Folder, LogIn} from "lucide-react";
import {Button} from "@/components/ui/button";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";

const files = [
    {
        name: "john.pdf",
        body: "John Doe has over 10 years of experience in software development, specializing in web applications and database management.",
    },
    {
        name: "jane_smith.docx",
        body: "Jane Smith is a seasoned project manager with a focus on agile methodologies and team leadership in tech industries.",
    },
    {
        name: "alice.txt",
        body: "Alice Johnson is a graphic designer with a keen eye for detail and a strong portfolio in branding and UX/UI design.",
    },
    {
        name: "bob.pdf",
        body: "Bob Brown is a cybersecurity expert with extensive knowledge in network security, threat analysis, and risk management.",
    },
    {
        name: "carol.docx",
        body: "Carol White is a data scientist with expertise in machine learning, statistical analysis, and big data technologies.",
    },
];


interface Feature {
    Icon: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
    name: string;
    description: string;
    href: string;
    cta: string;
    className: string;
    background: React.ReactNode;
}


const features: Feature[] = [
    {
        Icon: FileTextIcon,
        name: "Envoyer Votre CV",
        description: "Téléchargez votre CV pour commencer a être analysé par notre IA.",
        href: "/upload",
        cta: "Télécharger",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute -top-5 left-0 right-0 flex flex-col items-center justify-center w-full h-full rounded-lg p-4">
                <input type="file" className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer">
                    <Button className="flex items-center justify-center h-12 w-40 rounded">
                        Choisir Fichier
                    </Button>
                </label>
                <p className="text-sm mt-2 dark:text-gray-200">Pas de fichier choisi</p>
                <p className="text-xs mt-1 text-gray-500">Formats supportés: PDF, DOCX, TXT</p>
            </div>
        ),
    },
    {
        Icon: Brain,
        name: "Analyser par AI",
        description: "Notre IA simplifie le processus de candidature et évalue votre CV avec précision.",
        href: "/analyze",
        cta: "Analyser",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute -top-5 left-0 right-0 flex flex-col items-center justify-center w-full h-full rounded-lg p-4">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full">
                    <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8z" className="opacity-75"/>
                    </svg>
                </div>
                <p className="text-md mt-4 text-gray-700 dark:text-gray-200">Analyse en cours...</p>
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">Veuillez patienter, cela peut prendre quelques minutes.</p>
            </div>
        ),
    },
    {
        Icon: LogIn,
        name: "Inscrivez-vous",
        description: "Inscrivez-vous pour débloquer des fonctionnalités exclusives.",
        href: "/signup",
        cta: "inscription",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute -top-5 left-0 right-0 flex flex-col items-center justify-center w-full h-full rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Fonctionnalités Exclusives</h3>
                <ul className="list-disc mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>Suivi des candidatures</li>
                    <li>Accès à des modèles de CV premium</li>
                    <li>Conseils personnalisés de carrière</li>
                </ul>
                <p className="text-xs mt-4 text-gray-500 dark:text-gray-400">Termes et conditions s'appliquent.</p>
            </div>
        ),
    },
    {
        Icon: Folder,
        name: "Exemple de fichier",
        description: "Téléchargez des exemples de fichiers pour voir le fonctionnement de notre service.",
        href: "/examples",
        cta: "Voir exemples",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Marquee
                pauseOnHover
                className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
            >
                {files.map((f, idx) => (
                    <figure
                        key={idx}
                        className={cn(
                            "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
                            "border-gray-900 bg-gray-900 hover:bg-gray-900",
                            "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
                        )}
                    >
                        <div className="flex flex-row items-center gap-2">
                            <div className="flex flex-col">
                                <figcaption className="text-sm font-medium dark:text-white ">
                                    {f.name}
                                </figcaption>
                            </div>
                        </div>
                        <blockquote className="mt-2 text-xs">{f.body}</blockquote>
                    </figure>
                ))}
            </Marquee>
        ),
    },
];




export function BentoDemo() {
    return (
        <div className="max-w-5xl mx-auto mt-40 w-full h-full">
            <AnimatedGradientText>
                <h1 className="animate-gradient bg-gradient-to-r from-[#6157ff] via-[#EE49FD] to-[#6157ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-6xl -mt-5 sm:-mt-10 pb-2">
                    Fonctionnalités
                </h1>
            </AnimatedGradientText>
            <BentoGrid className="">
                {features.map((feature, idx) => (
                    <BentoCard key={idx} {...feature} />
                ))}
            </BentoGrid>
        </div>
    );
}
