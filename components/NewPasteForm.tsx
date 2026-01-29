"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { AlertDialogAction, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { PasteAlert } from "./PasteAlert";

type PasteFormData = {
    content: string;
    ttl_seconds: number | null;
    max_views: number | null;
};

export function NewPasteForm() {
    const [data, setData] = useState<PasteFormData>({
        content: "",
        max_views: null,
        ttl_seconds: null,
    });
    const [open, setOpen] = useState(false);
    const [responseJson, setResponseJson] = useState({})

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("/api/pastes", {
            method: "POST",
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            return
        }

        const resJson = await response.json()
        setResponseJson(resJson)
        setData({
            content: "",
            max_views: null,
            ttl_seconds: null,
        })
        setOpen(true)
    }



    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl flex flex-col space-y-6"
        >
            <div className="flex flex-col space-y-2">
                <Label htmlFor="paste">New Paste</Label>
                <Textarea
                    id="paste"
                    placeholder="Paste here..."
                    className="h-80"
                    value={data.content}
                    onChange={(e) =>
                        setData((prev) => ({
                            ...prev,
                            content: e.target.value,
                        }))
                    }
                    required
                />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="max_views">Max Views (Optional)</Label>
                <Input
                    type="number"
                    placeholder="type here..."
                    value={data.max_views ?? ""}
                    onChange={(e) =>
                        setData((prev) => ({
                            ...prev,
                            max_views: e.target.value === ""
                                ? null
                                : Number(e.target.value),
                        }))
                    }
                />
            </div>
            <div className="flex flex-col space-y-2">
                <Label htmlFor="ttl_seconds">TTL Seconds (Optional) </Label>
                <Input
                    type="number"
                    placeholder="type here..."
                    value={data.ttl_seconds ?? ""}
                    onChange={(e) =>
                        setData((prev) => ({
                            ...prev,
                            ttl_seconds: e.target.value === ""
                                ? null
                                : Number(e.target.value),
                        }))
                    }
                />
            </div>
            <PasteAlert open={open} onOpenChange={setOpen} resJson={responseJson} />
            <div className="flex space-x-4">
                <Button type="submit" className="btn max-w-xs">Create</Button>
                <Button type="submit" className="btn max-w-xs">Reset</Button>
            </div>

        </form>
    );
}
