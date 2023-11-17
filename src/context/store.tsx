// Init
import React, { useContext, useState, createContext, ReactNode } from 'react';

// Initializing Create Context Hook
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StoreType {}

const storeContext = createContext<StoreType | null>(null);

interface UpdateStoreType {
  updateStore: (data: StoreType) => void;
}

const storeUpdateContext = createContext<UpdateStoreType | null>(null);

// We are also initializing useContexts here
// we only call these functions where we need that data
export const Store = (): StoreType | null => {
  return useContext(storeContext);
};

export const UpdateStore = (): UpdateStoreType | null => {
  return useContext(storeUpdateContext);
};

// Initializing Store Provider
export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initializing State
  const [store, setStore] = useState<StoreType>({});

  const updateStore = (data: StoreType): void => {
    setStore((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // Render
  return (
    <storeContext.Provider value={store}>
      <storeUpdateContext.Provider value={{ updateStore }}>{children}</storeUpdateContext.Provider>
    </storeContext.Provider>
  );
};
