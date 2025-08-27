import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type InstrumentSessionContextType = {
  instrumentSession: string,
  setInstrumentSession: (session: string) => void;
}

const InstrumentSessionContext = createContext<InstrumentSessionContextType | undefined>(undefined);

const STORAGE_KEY = "instrument-session-id"

export const InstrumentSessionProvider = ({
  children,
  defaultSessionId = "0-0",
}: { children: ReactNode; defaultSessionId?: string }) => {

  const [instrumentSession, setInstrumentSession] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) ?? defaultSessionId;
  });

  useEffect(() => {localStorage.setItem(STORAGE_KEY, instrumentSession)}, [instrumentSession]);

  return (
    <InstrumentSessionContext.Provider value={{ instrumentSession, setInstrumentSession}}>
      {children}
    </InstrumentSessionContext.Provider>
  );
};

export const useInstrumentSession = () => {
  const context = useContext(InstrumentSessionContext);
  if (!context) throw new Error("useInstrumentSession must be used within InstrumentSessionProvider");
  return context;
}