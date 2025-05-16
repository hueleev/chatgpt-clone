"use server";

import { getUserByEmail } from "@/data/user";
import db from "@/db";
import { user } from "@/db/schema";
import { SignUpSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const signUp = async (_: any, formData: FormData) => {
  // 1. validate fields
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errorMessage: "잘못된 입력값이 있습니다.",
    };
  }

  // 2. 존재하는 사용자인지 체크
  const { email, name, password } = validatedFields.data;
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        errorMessage: "이미 존재하는 사용자입니다.",
      };
    }

    // 3. insert DB
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(user).values({ name, email, password: hashedPassword });
  } catch (error) {
    console.log("🚀 ~ signUp ~ error:", error);
    return { errorMessage: "문제가 발생했습니다." };
  }

  // 4. 성공/실패 처리
  redirect("/login");
};
