import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function AnimatedGradientText({
                                                 children,
                                                 className,
                                             }: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "group relative  flex max-w-fit flex-row items-center justify-center rounded-2xl py-1.5 text-sm font-medium duration-500 ease-out [--bg-size:300%]",
                className,
            )}
        >
            {children}
        </div>
    );
}