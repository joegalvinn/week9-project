import { db } from "@/utils/dbConnection";
export default async function feed() {
  const lakeposts = await db.query(
    `
        SELECT lakePosts.post, lakePosts.image_url, users.username
FROM lakePosts
JOIN users ON lakePosts.clerk_user_id = users.clerk_user_id
ORDER BY lakePosts.created_at DESC`
  );
  console.log(lakeposts);
  const post = lakeposts.rows[0];

  return (
    <div>
      <h1>
        Welcome to the lake <br /> Please make a Ripple
      </h1>
      <div className="returnLakeposts">
        {lakeposts.rows.map((post, index) => (
          <div key={index} className="flex flex-col items-center">
            <h2 className="name">{post.username}</h2>
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
    </div>
  );
}
