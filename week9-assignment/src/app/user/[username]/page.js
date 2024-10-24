//if you want to setup a profile page that renders data from clerk, you need:
// auth() --> userId
// currentUser --> username, email address, ...

//the data i render here comes from two places
//some data comes from the currentUser (the data taken from clerk)
//other data comes from the users table (bio, other user data...)

export default async function UserPage() {
  const user = await currentUser();
  //you can console.log user to see what it looks like inside
  return (
    <>
      <h1>User Page</h1>
      {/* <h2> */}
      {/* we can use optional chaining incase the user does not provide all the data we want to render */}
      {/* Welcome, {user?.firstName} */}
      {/* {user?.lastName} */}
      {/* </h2> */}
      {/* <p>{user?.emailAddresses[0].emailAddresses}</p> */}
    </>
  );
}
