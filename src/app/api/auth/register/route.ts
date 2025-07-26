import { connectToDatabase } from "../../../../../lib/db";
import User from "../../../../../models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and Password are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already registered" },
                { status: 400 }
            );
        }

        await User.create({ name, email, password });

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 } // Use 201 for "Created"
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Failed User registration" },
            { status: 500 }
        );
    }
}