import { createContext, useReducer, useContext} from "react";

import reducer from './reducer'
import { initialState } from './initialState';

const contextCreate = createContext();

const ProviderContext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const value = {
        state,
        dispatch
    }

    console.log(value);


  return (
    <contextCreate.Provider value={value}>
        {children}
    </contextCreate.Provider>
  )

};

const GetDataToContext = () => {
    return useContext(contextCreate);
}

export {
    GetDataToContext
}

export default ProviderContext;
