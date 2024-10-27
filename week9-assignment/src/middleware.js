import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
//set up your middleware using clerks template
//you don't need to wrte the template youself you only write the logic to make soem routes protected and some public
const isProtectedRoutes = createRouteMatcher([
  "/feed(.*)",
  "/createProfile(.*)",
  "/user(.*)",
]);

//we are going to use clerkMiddleware to put together the matches and the matcher
//if the protected route match is in the request, protect with authentication
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoutes(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
