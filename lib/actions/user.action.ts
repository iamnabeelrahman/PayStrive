"use server";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

export const signIn = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (userData: SignUpParams) => {
    const {firstName, lastName, email, password} = userData
  try {
    // registering/creating user
    const { account } = await createAdminClient();

    const createNewUser = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`  
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
     

    return parseStringify(createNewUser)
  } catch (error) {
    console.log(error);
  }
};
