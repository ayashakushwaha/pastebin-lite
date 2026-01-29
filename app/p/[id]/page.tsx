'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function ViewPaste() {
    const [content, setContent] = useState("")
    const { id } = useParams();

    useEffect(() => {
        const getPaste = async () => {
            const response = await fetch(`/api/pastes/${id}`)
            if (!response.ok) {
                return
            }
            const data = await response.json()
            setContent(data.content)
        }
        getPaste()
    }, [])

    return (
        <div className="container flex min-h-screen py-10 mx-16">
            <pre>
                {content}
            </pre>
        </div>

    )
}