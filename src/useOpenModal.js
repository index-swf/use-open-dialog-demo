import React, { useState, useReducer, useContext } from "react";
import { Dialog } from "@material-ui/core";

const OpenModalContext = React.createContext();
export const ModalContext = React.createContext();

const useOpenModal = () => {
  const { openModal } = useContext(OpenModalContext);

  return openModal;
};

const getNewId = () => new Date().valueOf() + Math.random();

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "add":
      return [...state, payload];
    case "remove":
      return state.filter(item => item.key !== payload);
    default:
      throw new Error(`unknown action type: ${type}`);
  }
};

const DialogWithProvider = React.memo(
  ({ key, options, component, resolve, reject, dispatch }) => {
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => {
      setIsOpen(false);
      reject(new Error("user cancelled"));
    };
    const handleExited = () => {
      dispatch({ type: "remove", payload: key });
    };
    const successCallback = value => {
      resolve(value);
      setIsOpen(false);
    };
    const cancelCallback = value => {
      reject(value);
      setIsOpen(false);
    };

    return (
      <ModalContext.Provider value={[successCallback, cancelCallback]}>
        <Dialog
          {...options}
          open={isOpen}
          onClose={handleClose}
          onExited={handleExited}
        >
          {component}
        </Dialog>
      </ModalContext.Provider>
    );
  }
);
export const OpenModalProvider = ({ children }) => {
  const [modalList, dispatch] = useReducer(reducer, []);
  const openModal = (component, options) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: "add",
        payload: {
          key: getNewId(),
          component,
          options,
          resolve,
          reject,
          dispatch
        }
      });
    });
  };

  return (
    <OpenModalContext.Provider value={{ openModal }}>
      {children}
      {modalList.map(props => (
        <DialogWithProvider {...props} />
      ))}
    </OpenModalContext.Provider>
  );
};
export default useOpenModal;
