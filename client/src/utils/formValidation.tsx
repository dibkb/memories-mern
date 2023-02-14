export const lengthTest = (value: string) => {
  const regex = /^.{3,}$/;
  return regex.test(value);
};
export const alphabetTest = (value: string) => {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(value);
};
