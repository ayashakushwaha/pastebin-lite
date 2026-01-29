import { insertPaste, pastesTable } from "@/db/schema";
import { db } from "@/lib/db";
import { getNowForExpiry } from "@/lib/time";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { content, ttl_seconds, max_views } = body;

        if (typeof content !== "string" || content.trim() === "") {
            return NextResponse.json(
                { error: "Content is empty!" },
                { status: 400 }
            );
        } else if (max_views && (typeof max_views !== "number" || max_views < 1)) {
            return NextResponse.json(
                { error: "max_views should be of type int and greater than 0." },
                { status: 400 }
            );
        } else if (ttl_seconds && (typeof ttl_seconds !== "number" || ttl_seconds < 1)) {
            return NextResponse.json(
                { error: "ttl_seconds should be of type int and greater than 0." },
                { status: 400 }
            );
        }

        const nanoId = nanoid(8);
        const now = getNowForExpiry(req)
        const origin = req.nextUrl.origin;

        const newPaste: insertPaste = {
            id: nanoId,
            content: content.trim(),
            remainingViews:
                typeof max_views === "number" && max_views > 0
                    ? max_views
                    : null,
            expiresAt:
                typeof ttl_seconds === "number" && ttl_seconds > 0
                    ? new Date(now.getTime() + ttl_seconds * 1000)
                    : null,
        };

        const [insertedPaste] = await db.insert(pastesTable).values(newPaste).returning();

        if (!insertedPaste) {
            return NextResponse.json(
                { error: "Failed to create paste" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                id: insertedPaste.id,
                url: `${origin}/p/${insertedPaste.id}`,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create paste error:", error);

        return NextResponse.json(
            { error: "Error creating paste!" },
            { status: 500 }
        );
    }
}

