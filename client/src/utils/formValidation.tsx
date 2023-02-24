import { BASEURL } from "../api/api";

export const lengthTest = (value: string) => {
  const regex = /^.{3,}$/;
  return regex.test(value);
};
export const alphabetTest = (value: string) => {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(value);
};
export const emailTest = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};
export const alphaNumericCheck = (value: string) => {
  const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
  return alphanumericRegex.test(value);
};
export const checkEmail = async (email: string) => {
  const url = `${BASEURL}/users/validateemail`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  const data = await response.json();
  const result = await data.emailExists;
  return result;
};
export const emailExists = (email: string) => {
  let emailExist;
  checkEmail(email).then((res) => {
    emailExist = res;
    // console.log(emailExist);
  });
  return emailExist;
};
