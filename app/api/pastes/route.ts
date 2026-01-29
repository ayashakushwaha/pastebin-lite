import { NextResponse } from "next/server";

export async function POST(){
    return NextResponse.json({
            "id": "string",
            "url": "https://your-app.vercel.app/p/<id>"
        } ,
        {status: 200} 
    )
}