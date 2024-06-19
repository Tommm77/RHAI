import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import {Users, ClipboardCheck, Briefcase, BarChartIcon} from "lucide-react";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";

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
        Icon: Users,
        name: "Statistiques des Candidatures",
        description: "Visualisez le nombre total de candidatures reçues et traitées.",
        href: "/stats/candidatures",
        cta: "Voir Détails",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute -top-5 left-0 right-0 flex flex-col items-center justify-center w-full h-full rounded-lg p-4">
                <p className="text-4xl font-bold text-gray-700 dark:text-gray-200">1200+</p>
                <p className="text-sm mt-2 dark:text-gray-200">Candidatures ce mois-ci</p>
            </div>
        ),
    },
    {
        Icon: ClipboardCheck,
        name: "Taux de Réponse",
        description: "Suivez le taux de réponse aux candidatures.",
        href: "/stats/reponse",
        cta: "Voir Détails",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute -top-5 left-0 right-0 flex flex-col items-center justify-center w-full h-full rounded-lg p-4">
                <p className="text-4xl font-bold text-gray-700 dark:text-gray-200">85%</p>
                <p className="text-sm mt-2 dark:text-gray-200">Réponses dans les 48 heures</p>
            </div>
        ),
    },
    {
        Icon: Briefcase,
        name: "Offres d'Emploi",
        description: "Consultez les offres d'emploi disponibles sur notre plateforme.",
        href: "/jobs",
        cta: "Voir Offres",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute -top-5 left-0 right-0 flex flex-col items-center justify-center w-full h-full rounded-lg p-4">
                <p className="text-4xl font-bold text-gray-700 dark:text-gray-200">300+</p>
                <p className="text-sm mt-2 dark:text-gray-200">Offres d'emploi disponibles</p>
            </div>
        ),
    },
    {
        Icon: BarChartIcon,
        name: "Satisfaction des Candidats",
        description: "Suivez la satisfaction des candidats avec notre service.",
        href: "/stats/satisfaction",
        cta: "Voir Détails",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute -top-5 left-0 right-0 flex flex-col items-center justify-center w-full h-full rounded-lg p-4">
                <p className="text-4xl font-bold text-gray-700 dark:text-gray-200">90%</p>
                <p className="text-sm mt-2 dark:text-gray-200">Candidats satisfaits</p>
            </div>
        ),
    },
];

export function BentoDemo() {
    return (
        <div className="max-w-5xl mx-auto mt-40 w-full h-full mb-10">
            <AnimatedGradientText>
                <h1 className="animate-gradient bg-gradient-to-r from-[#6157ff] via-[#EE49FD] to-[#6157ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-4xl -mt-5 sm:-mt-10 pb-2">
                    STATS
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
