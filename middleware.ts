import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
    function middleware(req) {
        // You can add custom logic here if needed
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ req , token }) => {
                const {pathname} = req.nextUrl
                if(pathname.startsWith('/api/auth') || pathname==="/login" || pathname==="/register" ) {
                    return true; // Allow access to auth and ai API routes
                }
                if(pathname==="/" || pathname.startsWith('/api/videos')) {
                    return true; // Allow access to auth and ai API routes
                }
                return !!token; // Allow access if the user is authenticated
            },
        },
    }
);   
export const config = {
    matcher: [

    ],
};