import React, { useContext, createContext, useState, useMemo } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { PokemonsResponse, PokemonResponseResult } from "../@types/api";
import { pokemonApi } from "../api";

type AppsContextProps = {
  pokemons: UseQueryResult<PokemonsResponse>;
  searchQuery: string;
  filteredPokemons: PokemonResponseResult[] | undefined;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

type AppStateProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<AppsContextProps>({} as AppsContextProps);
export const useApp = () => useContext(AppContext);

export const AppStateProvider: React.FC<AppStateProviderProps> = ({
  children,
}) => {
  const pokemons = useQuery("all-pokemons", () => {
    return pokemonApi.getAllPokemons();
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPokemons = useMemo(() => {
    if (searchQuery === "") {
      return pokemons.data?.data.results;
    }

    return pokemons.data?.data.results?.filter((pokemon) => {
      return pokemon.name.includes(searchQuery);
    });
  }, [searchQuery, pokemons.data]);

  return (
    <AppContext.Provider
      value={{
        pokemons,
        searchQuery,
        setSearchQuery,
        filteredPokemons,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
