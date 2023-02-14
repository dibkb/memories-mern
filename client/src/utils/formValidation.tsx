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
export const emailExists = async (email: string) => {
  const url = "http://localhost:4000/users/validateemail";
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
