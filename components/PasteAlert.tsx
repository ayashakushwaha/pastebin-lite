import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "./ui/input"

export function PasteAlert({
    open,
    onOpenChange,
    resJson
}: {
    open: boolean | undefined,
    onOpenChange: (open: boolean) => void
    resJson: any
}) {
    const handleCopy = async () => {
        if (resJson.url) {
            await navigator.clipboard.writeText(resJson.url)
        }
        alert("Link Copied!")
    }
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Paste Link Created!</AlertDialogTitle>
                    <AlertDialogDescription className="w-full">
                        <div className="flex space-x-2">
                            <Input value={resJson.url} readOnly />
                            <AlertDialogAction variant={"default"} onClick={handleCopy}>Copy Link</AlertDialogAction>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant={"secondary"}><Link href={`/p/${resJson.id}`}>Open Link</Link></AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
