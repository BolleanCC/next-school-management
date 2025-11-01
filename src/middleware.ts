import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { routeAccessMap } from './lib/settings';
import { NextResponse } from 'next/server';

const matchers = Object.keys(routeAccessMap).map((route) => ({
    matcher: createRouteMatcher([route]),
    allowedRoles: routeAccessMap[route],
}));

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
    '/admin(.*)',
    '/teacher(.*)',
    '/student(.*)',
    '/parent(.*)',
    '/list(.*)',
]);

// Define public routes
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/']);

console.log(matchers);

export default clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    // If user is not signed in and trying to access protected route, redirect to sign-in
    if (!userId && isProtectedRoute(req)) {
        const signInUrl = new URL('/sign-in', req.url);
        signInUrl.searchParams.set('redirect_url', req.url);
        return NextResponse.redirect(signInUrl);
    }

    // If user is signed in and on sign-in page or root, redirect to their role page
    if (userId && role && (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/')) {
        return NextResponse.redirect(new URL(`/${role}`, req.url));
    }

    // Check role-based access
    for (const { matcher, allowedRoles } of matchers) {
        if (matcher(req) && (!role || !allowedRoles.includes(role))) {
            return NextResponse.redirect(new URL(`/${role || 'sign-in'}`, req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};