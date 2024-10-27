import Image from "next/image";
import { SignIn, SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import * as Dialog from "@radix-ui/react-dialog";

export default function Home() {
  return (
    <div>
      <h1>
        Welcome to RippleFeed <br /> Please Sign in / Sign up
      </h1>
      <SignIn
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
}
