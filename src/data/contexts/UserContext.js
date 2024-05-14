import React, {createContext, useContext, useState} from 'react';

// Créez un contexte pour stocker les données de l'utilisateur
const UserContext = createContext();

// Créez un fournisseur pour fournir les données de l'utilisateur à l'ensemble de l'application
export const UserProvider = ({children}) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      {children}
    </UserContext.Provider>
  );
};

// Fonction de commodité pour utiliser le contexte de l'utilisateur
export const useUser = () => useContext(UserContext);

export const updateUser = (newUserData, setUserData) => {
  setUserData(newUserData);
};
