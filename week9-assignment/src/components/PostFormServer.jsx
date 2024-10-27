"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";

export async function post(formValues) {
  const { userId } = await auth();

  const formData = {
    post: formValues.get("post"),
    image_url: formValues.get("image_url"),
    clerk_user_id: userId,
  };
  console.log(formData);

  try {
    await db.query(
      `INSERT INTO lakePosts (post, clerk_user_id, image_url)
      VALUES ($1, $2, $3)`,
      [formData.post, formData.clerk_user_id, formData.image_url]
    );
    revalidatePath("/feed");
  } catch (error) {
    console.error("Error creating profile:", error);
  }
}
