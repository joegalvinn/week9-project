// //if you want to setup a profile page that renders data from clerk, you need:
// // auth() --> userId
// // currentUser --> username, email address, ...
// import { auth } from "@clerk/nextjs/server";
// import { currentUser } from "@clerk/nextjs/server";

// //the data i render here comes from two places
// //some data comes from the currentUser (the data taken from clerk)
// //other data comes from the users table (bio, other user data...)

// export default async function UserPage() {
//   const user = await currentUser();
//   //you can console.log user to see what it looks like inside
//   return (
//     <div>
//       <h1>User Page</h1>
//       {/* <h2> */}
//       {/* we can use optional chaining incase the user does not provide all the data we want to render */}
//       {/* Welcome, {user?.firstName} */}
//       {/* {user?.lastName} */}
//       {/* </h2> */}
//       {/* <p>{user?.emailAddresses[0].emailAddresses}</p> */}
//     </div>
//   );
// }
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";

export default async function UserFeed({ params }) {
  const { userId } = await auth();

  const userProfile = await db.query(
    `SELECT username, profile_picture_url, bio, name
     FROM users
     WHERE clerk_user_id = $1`,
    [userId]
  );

  const lakeposts = await db.query(
    `SELECT lakePosts.post, lakePosts.image_url, users.name
     FROM lakePosts
     JOIN users ON lakePosts.clerk_user_id = users.clerk_user_id
     WHERE users.clerk_user_id = $1`,
    [userId]
  );

  const user = userProfile.rows.length > 0 ? userProfile.rows[0] : null;

  return (
    <div>
      <div className="useritems flex flex-col items-center">
        {user ? (
          <>
            <h2 className="name">{user.username}</h2>
            <h2 className="bio">{user.bio}</h2>
            {user.profile_picture_url ? (
              <img src={user.profile_picture_url} alt="user's image" />
            ) : (
              <img src="https://image.shutterstock.com/image-vector/no-user-profile-picture-hand-250nw-103417358.jpg" />
            )}
          </>
        ) : (
          <h2 className="error">User not found</h2>
        )}
      </div>

      <div className="returnLakeposts">
        {lakeposts.rows.map((post, index) => (
          <div key={index} className="flex flex-col items-center">
            <h2 className="name">{user.username}</h2>
            <h2 className="post">{post.post}</h2>
            {post.image_url ? (
              <img
                src={post.image_url}
                alt="user's image"
                className="review-image"
              />
            ) : null}
          </div>
        ))}
      </div>
      <div>
        <Link className="editButton" href={`/editProfile/${userId}`}>
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
