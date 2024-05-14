import React, {createContext, useContext, useState} from 'react';

const RegisteredGamesContext = createContext();

export const RegisteredGameProvider = ({children}) => {
  const [RegisteredGamesData, setRegisteredGamesData] = useState(null);

  return (
    <RegisteredGamesContext.Provider
      value={{RegisteredGamesData, setRegisteredGamesData}}>
      {children}
    </RegisteredGamesContext.Provider>
  );
};

export const useRegisteredGamesData = () => useContext(RegisteredGamesContext);

export const updateRegisteredGames = (
  newRegisteredGamesData,
  setRegisteredGamesData,
) => {
  setRegisteredGamesData(newRegisteredGamesData);
};