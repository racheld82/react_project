import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {


  const initialUser = {
    userID: 0,
  };
  const [userID, setUserID] = useState(initialUser);

   const updateUserID = (id) => {
    setUserID(id);
  };

  return (
    <UserContext.Provider value={{ userID, updateUserID }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;