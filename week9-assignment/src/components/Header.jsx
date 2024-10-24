//nav here
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
//all of these components work in the server

//we are going to import auth() to have access to authentication credentials from the user
import { auth } from "@clerk/nextjs/server";

export default function Header() {
  //we can destructure the userid from clerk auth
  //this userid can be saved to your db so you can match user with posts
  const { userId } = auth();

  return (
    <>
      {/* we only want to show the user when the user is signed in */}
      <SignedIn>
        <UserButton />
      </SignedIn>
      {/* we only want to show the signin and signout button when the user is signed out */}
      <SignedOut>
        <SignInButton mode="modal">Sign In</SignInButton>
        <SignUpButton mode="modal">Sign Up</SignUpButton>
      </SignedOut>
    </>
  );
}
