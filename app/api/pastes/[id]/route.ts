import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  const paste = ["1"].find(p => p)

  if (!paste) {
    return NextResponse.json(
      { error: "Paste not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(
    {
        data: {
            "content": "string",
            "remaining_views": 4,
            "expires_at": "2026-01-01T00:00:00.000Z"
        }
    },
    { status : 200 }
  )
}
