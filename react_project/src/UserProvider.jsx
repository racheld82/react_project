import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {

  const storedUser = JSON.parse(localStorage.getItem('currentUser')).id||0;

  const initialUser = {
    userID: 0,
  };
  const [userID, setUserID] = useState(storedUser);

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

// import React, { createContext, useState, useEffect } from 'react';

// export const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const storedUser = localStorage.getItem('activeUser');
//   const initialUser = storedUser ? JSON.parse(storedUser) : { username: '' };

//   const [user, setUser] = useState(initialUser);

//   useEffect(() => {
//     localStorage.setItem('activeUser', JSON.stringify(user));
//   }, [user]);

//   const updateUser = (name, value) => {
//     setUser({ ...user, [name]: value });
//   };

//   const setCurrentUser = (newUser) => {
//     setUser(newUser);
//   };

//   return (
//     <UserContext.Provider value={{ userID, updateUser, setCurrentUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;