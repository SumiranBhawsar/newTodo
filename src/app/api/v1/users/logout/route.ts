/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    // Clear the authentication cookie (example: 'token')
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        path: '/',
        sameSite: 'lax',
    });
    return response;
}