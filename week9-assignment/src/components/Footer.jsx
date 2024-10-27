import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/nextjs";
import "./footerstyle.css";

export default async function Footer() {
  //we can destructure the userid from clerk auth
  //this userid can be saved to your db so you can match user with posts
  const { userId } = await auth();

  return (
    <div className="fixed-footer">
      <SignedIn>
        <Link href="/feed">The Lake</Link>
        <Link href={`/user/${userId}`}>My Pond</Link>
      </SignedIn>
    </div>
  );
}
