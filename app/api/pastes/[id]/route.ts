import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
 
  const { id } = await params;

  return NextResponse.json(
    {
      content: "string",
      remaining_views: 4,
      expires_at: "2026-01-01T00:00:00.000Z",
      id,
    },
    { status: 200 }
  );
}
