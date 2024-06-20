import {Navbar} from "@/components/HomePage/components/Navbar";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export const MonitoringHome = () => {
    return (
        <div className="h-full w-full">
            <Navbar />
            <div className="flex flex-col justify-center items-center mt-20">
                <div className="flex space-x-10">
                    <Button className="rounded-xl">
                        <Link href="https://rhai-api.vercel.app/admin/" className="rounded-2xl">
                            <p>accéder admin</p>
                        </Link>
                    </Button>
                    <Button className="rounded-xl">
                        <Link href="https://rhai-api.vercel.app/swagger/" className="rounded-2xl">
                            <p>accéder swagger</p>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}