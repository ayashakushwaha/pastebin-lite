import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-center gap-6 px-4">
            <h1 className="text-4xl font-bold">404</h1>

            <p className="text-muted-foreground">
                The page you’re looking for doesn’t exist.
            </p>

            <Button asChild>
                <Link href="/">Go Home</Link>
            </Button>
        </div>
    );
}
