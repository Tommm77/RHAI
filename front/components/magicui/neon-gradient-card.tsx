"use client";

import { cn } from "@/lib/utils";
import React, { CSSProperties, useEffect, useRef, useState, ReactNode } from "react";

interface NeonColorsProps {
    firstColor: string;
    secondColor: string;
}

interface NeonGradientCardProps {
    className?: string;
    children?: ReactNode;
    borderSize?: number;
    borderRadius?: number;
    neonColors?: NeonColorsProps;
    [key: string]: any;
}

const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
                                                               className,
                                                               children,
                                                               borderSize = 0,
                                                               borderRadius = 20,
                                                               neonColors = {
                                                                   firstColor: "#6157FF",
                                                                   secondColor: "#EE49FD",
                                                               },
                                                               ...props
                                                           }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;
                setDimensions({ width: offsetWidth, height: offsetHeight });
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={
                {
                    "--border-size": `${borderSize}px`,
                    "--border-radius": `${borderRadius}px`,
                    "--neon-first-color": neonColors.firstColor,
                    "--neon-second-color": neonColors.secondColor,
                    "--card-width": `${dimensions.width}px`,
                    "--card-height": `${dimensions.height}px`,
                    "--card-content-radius": `${borderRadius - borderSize}px`,
                    "--pseudo-element-background-image": `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
                    "--pseudo-element-width": `${dimensions.width + borderSize}px`,
                    "--pseudo-element-height": `${dimensions.height + borderSize}px`,
                    "--after-blur": `${dimensions.width / 2}px`,
                } as CSSProperties
            }
            className={cn(
                "relative z-10 h-full w-full rounded-[var(--border-radius)]",
                className,
            )}
            {...props}
        >
            <div
                className={cn(
                    "relative h-full min-h-[inherit] w-full rounded-[var(--card-content-radius)] bg-transparent p-1",
                    "before:absolute before:-left-[var(--border-size)] before:-top-[var(--border-size)] before:-z-10 before:block",
                    "before:h-[var(--pseudo-element-height)] before:w-[var(--pseudo-element-width)] before:rounded-[var(--border-radius)] before:content-['']",
                    "before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-[length:100%_200%]",
                    "before:animate-backgroundPositionSpin",
                    "after:absolute after:-left-[var(--border-size)] after:-top-[var(--border-size)] after:-z-10 after:block",
                    "after:h-[var(--pseudo-element-height)] after:w-[var(--pseudo-element-width)] after:rounded-[var(--border-radius)] after:blur-[var(--after-blur)] after:content-['']",
                    "after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-[length:100%_200%]",
                    "after:animate-backgroundPositionSpin",
                )}
            >
                {children}
            </div>
        </div>
    );
};

export { NeonGradientCard };