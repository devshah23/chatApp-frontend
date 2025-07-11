import { isValidUsername } from "6pp";

export const usernameValidator = (username) => {
  if (
    username.length < 6 ||
    username.includes(" ") ||
    !(
      username.includes("@") ||
      username.includes("_") ||
      username.includes("-") ||
      username.includes(".")
    )
  ) {
    console.log(username);
    console.log(
      username.length,
      username.includes(" "),
      username.includes("@"),
      username.includes("_")
    );
    return { isValid: false, errorMessage: "Username is Invalid" };
  }
};
