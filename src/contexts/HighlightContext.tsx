import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
type HighlightContextType = {
  highlightedId: string | null;
  setHighlightedId: (id: string | null) => void;
};

// Create the context with a default fallback
const HighlightContext = createContext<HighlightContextType | undefined>(
  undefined
);

// Provider component to wrap the app(main.tsx)
export const HighlightProvider = ({ children }: { children: ReactNode }) => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  return (
    <HighlightContext.Provider value={{ highlightedId, setHighlightedId }}>
      {children}
    </HighlightContext.Provider>
  );
};

// create hook to use it in table and chart components
// eslint-disable-next-line react-refresh/only-export-components
export const useHighlight = () => {
  const context = useContext(HighlightContext);
  if (!context) {
    throw new Error("useHighlight must be used within a HighlightProvider");
  }
  return context;
};
