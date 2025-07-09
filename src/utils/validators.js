import { isValidUsername } from "6pp";

export const usernameValidator = (username) => {
  if (
    !isValidUsername(username) ||
    username.length < 6 ||
    username.includes(" ") ||
    !(username.includes("@") || username.includes("_"))
  ) {
    return { isValid: false, errorMessage: "Username is Invalid" };
  }
};
