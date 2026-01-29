import { pastesTable } from "@/db/schema";
import { db } from "@/lib/db";
import { getNowForExpiry } from "@/lib/time";
import { eq, and, or, gt, isNull, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const now = getNowForExpiry(req)

    const [paste] = await db
      .select()
      .from(pastesTable)
      .where(
        and(
          eq(pastesTable.id, id),
          or(
            isNull(pastesTable.expiresAt),
            gt(pastesTable.expiresAt, now)
          ),
          or(
            isNull(pastesTable.remainingViews),
            gt(pastesTable.remainingViews, 0)
          )
        )
      )
      .limit(1);

    if (!paste) {
      return NextResponse.json(
        { error: "Paste not found" },
        { status: 404 }
      );
    }

    if (paste.remainingViews !== null) {
      await db
        .update(pastesTable)
        .set({
          remainingViews: sql`${pastesTable.remainingViews} - 1`,
        })
        .where(eq(pastesTable.id, id));
    }

    return NextResponse.json(
      {
        content: paste.content,
        remaining_views:
          paste.remainingViews !== null
            ? paste.remainingViews - 1
            : null,
        expires_at: paste.expiresAt,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Get paste error:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
