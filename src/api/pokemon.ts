import { PokemonsResponse, PokemonResponse } from "../@types/api";
import client from "./client";

const getAllPokemons = async (): Promise<PokemonsResponse> =>
  client.get("/pokemon?limit=2000");

const getPokemon = async (name: any): Promise<PokemonResponse> =>
  client.get(`/pokemon/${name}`);

const pokemonApi = {
  getPokemon,
  getAllPokemons,
};

export default pokemonApi;
