import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";

import "./index.css";
import { AppStateProvider } from "./states/AppState";
import PokeNode from "./pages/PokeNode";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppStateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:pokemon" element={<Pokemon />} />
            {/* <Route path="/pokenode" element={<PokeNode />} /> */}
          </Routes>
        </BrowserRouter>
      </AppStateProvider>
    </QueryClientProvider>
  );
}

export default App;
