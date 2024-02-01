import { NextResponse } from "next/server"
import cors from "./cors"

export async function OPTIONS(request: Request) {
  console.log("AHHHHHHHHH")
  return cors(
    request,
    new NextResponse(null, {
      status: 204
    })
  )
}