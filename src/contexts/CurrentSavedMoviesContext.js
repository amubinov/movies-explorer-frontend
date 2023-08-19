import React from 'react';
import { createContext, useContext, useState } from 'react';
export const CurrentSavedMoviesContext = React.createContext();
//
// export const CurrentSavedMoviesContext = createContext();

// export function CurrentSavedMoviesProvider({ children }) {
//   const [savedMovies, setSavedMovies] = useState([]);

//   const updateSavedMovies = (newMovies) => {
//     setSavedMovies(newMovies);
//   };

//   return (
//     <CurrentSavedMoviesContext.Provider value={{ savedMovies, updateSavedMovies }}>
//       {children}
//     </CurrentSavedMoviesContext.Provider>
//   );
// }

// export function useCurrentSavedMovies() {
//   return useContext(CurrentSavedMoviesContext);
// }
