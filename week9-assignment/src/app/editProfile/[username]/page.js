import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import * as React from "react";
import { redirect } from "next/navigation";

export default async function editProfilePage() {
  const { userId } = await auth();

  const userResult = await db.query(
    `SELECT * FROM users WHERE clerk_user_id = $1`,
    [userId]
  );

  console.log("Fetched user result:", userResult.rows);

  const user = userResult.rows?.[0] || null;

  if (!user) {
    console.error("User not found.");
  }

  async function updateProfile(formValues) {
    "use server";
    const updatedData = {
      name: formValues.get("name"),
      username: formValues.get("username"),
      bio: formValues.get("bio"),
      profile_picture_url: formValues.get("profile_picture_url"),
    };

    try {
      await db.query(
        `UPDATE users
         SET name = $1, username = $2, bio = $3, profile_picture_url = $4
         WHERE clerk_user_id = $5`,
        [
          updatedData.name,
          updatedData.username,
          updatedData.bio,
          updatedData.profile_picture_url,
          userId,
        ]
      );
      revalidatePath(`/user/${userId}`);
      redirect(`/user/${userId}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  return (
    <div>
      <h1>Edit Profile Page</h1>
      <div className="formContainer">
        <div>
          <form action={updateProfile} className="space-y-4">
            <div className="form-spacing">
              <label htmlFor="name">Name:</label>
              <textarea
                type="text"
                name="name"
                id="name"
                defaultValue={user?.name || ""}
                required
              />
            </div>
            <div className="form-spacing">
              <label htmlFor="username">Username:</label>
              <textarea
                type="text"
                name="username"
                id="username"
                defaultValue={user?.username || ""}
                required
              />
            </div>

            <div className="form-spacing">
              <label htmlFor="bio">Bio:</label>
              <textarea
                name="bio"
                id="bio"
                defaultValue={user?.bio || ""}
                required
              />
            </div>

            <div className="form-spacing">
              <label htmlFor="profile_picture_url">Profile Picture Url:</label>
              <textarea
                type="text"
                name="profile_picture_url"
                id="profile_picture_url"
                defaultValue={user?.profile_picture_url || ""}
              />
            </div>
            <button className="submit" type="submit">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
