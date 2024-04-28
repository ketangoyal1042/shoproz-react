import React from 'react'
import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({children}) => {
    const [values, setValues] = useState({
        keyword: null,
        results: [],
    });
    
  return (
    <SearchContext.Provider value={[values, setValues]}>
        {children}
    </SearchContext.Provider>
  )
}

const useSearch = ()=> useContext(SearchContext);

export {SearchProvider, useSearch};