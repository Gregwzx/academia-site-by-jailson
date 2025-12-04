/**
 * Copyright (c) 2020 Mohamed Hussein
 * Licensed under the MIT License (MIT), see
 */

import React, { useReducer, createContext } from "react";

export default (reducer, actions, initialValue) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialValue);

    const restActions = {};

    for (let action in actions) {
      restActions[action] = actions[action](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...restActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Provider, Context };
};
