import { createContext, useReducer, useContext } from "react";

export const initialStore=()=>{
  return{
    user: null,
    isAuthenticated: !!localStorage.getItem("token"),
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case "LOGIN":
      return {
        ...store,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...store,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw Error('Unknown action.');
  }    
}


export const Context = createContext();

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  const actions = {
    login: (userData) => dispatch({ type: "LOGIN", payload: userData }),
    logout: () => {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
    },
  };

  return (
    <Context.Provider value={{ store, actions }}>
      {children}
    </Context.Provider>
  );
};

export const useStore = () => useContext(Context);