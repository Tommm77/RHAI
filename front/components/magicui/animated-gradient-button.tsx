import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function AnimatedGradientButton({
                                                   children,
                                                   className,
                                                   backgroundColor,
                                               }: {
    children: ReactNode;
    className?: string;
    backgroundColor?: string;
}) {
    return (
        <div
            className={cn(
                "group relative flex max-w-fit flex-row items-center justify-center rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40",
                className,
            )}
            style={{ backgroundColor: backgroundColor || 'white' }}
        >
            <div
                className={`absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#dbf26e]/50 via-[#EF4471]/50 to-[#dbf26e]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
            />

            {children}
        </div>
    );
}
