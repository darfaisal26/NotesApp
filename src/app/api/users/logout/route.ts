import {NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookie = cookies();
    cookie.delete("token");
    console.log(cookie.getAll());
    return NextResponse.json({ message: "cookie deletd" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

