'use client'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function ViewPaste() {
    const [content, setContent] = useState("")
    const { id } = useParams();
    const router = useRouter();
    useEffect(() => {
        const getPaste = async () => {
            const response = await fetch(`/api/pastes/${id}`, { cache: "no-store" })
            if (!response.ok) {
                router.replace("/not-found");
                return;
            }
            const data = await response.json()
            setContent(data.content)
        }
        getPaste()
    }, [id, router])

    return (
        <div className="container flex ">
            <pre className="border border-black rounded-sm py-10 px-8 mx-8 text-wrap">
                {content}
            </pre>
        </div>

    )
}