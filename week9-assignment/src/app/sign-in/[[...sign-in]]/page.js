//You can use the SignIn component from clerk
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div>
      <h1>my sign in page</h1>
      <SignIn
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
}
