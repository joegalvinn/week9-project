//here you can use your clerk SignUp component
//you can then redirect the user to the createProfile page to complete their profile
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div>
      <h1>Sign-up for a welcome package.</h1>
      <SignUp
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
}
