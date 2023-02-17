import { Children, createContext, useState } from "react";

export const UserContext = createContext<UserContext | any>(null);
export const UserContextProvider: React.FC<UserContextProvider> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<userInfo>();
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
export type userInfo = {
  _id: string;
  firstName: string;
  lastName: string;
  image: string;
};
interface UserContext {
  userInfo: any;
  setUserInfo: (value: userInfo) => void;
}
interface UserContextProvider {
  children: React.ReactNode;
}
