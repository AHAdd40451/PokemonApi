import { PokemonClient } from "pokenode-ts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFindPokemon } from "../hooks/useFindPokemon";
import Loader from "./Loader";
import client from "../api/client";
import axios from "axios";

type PokemonCardProps = {
  name: string;
  showStats?: boolean;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, showStats }) => {
  const pokemon = useFindPokemon(name);
  const [apidata, setApidata] = useState<any>([]);
  const [type, setType] = useState<any>([]);
  const Id: any = pokemon.data?.data.types[0].type.url.slice(31, 33);
  useEffect(() => {
    const api = new PokemonClient(); // create an PokemonClient
    api
      .getPokemonSpeciesByName(name)
      .then((data) => setApidata(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (Id) {
      async function getUsers() {
        // 👇️ const data: GetUsersResponse
        const { data, status } = await axios.get<any>(
          `https://pokeapi.co/api/v2/type/${Id}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        setType(data);
        // 👇️ "response status is: 200
        return data;
      }
      getUsers();
    }
  }, [Id]);
  if (pokemon.isLoading) {
    return (
      <div className="w-full h-96 bg-gray-50 border border-gray-100 rounded-lg p-4 flex justify-center item-center">
        <Loader />
      </div>
    );
  }
  return (
    <Link
      to={`/${name}`}
      className="group block w-full bg-gray-50 border border-gray-100 rounded-lg p-4 transition transform space-y-8 hover:shadow hover:scale-105"
    >
      <div className="w-full h-56 flex justify-center">
        <img
          className="w-full h-full object-contain"
          src={pokemon.data?.data.sprites.other.dream_world.front_default}
          alt=""
        />
      </div>
      <div className="font-medium capitalize text-xl text-gray-500 transition group-hover:text-gray-700">
        {pokemon.data?.data.name}
      </div>
      {showStats && (
        <div className="space-y-2">
          <header className="font-medium text-gray-500">Types</header>
          {pokemon.data?.data?.types.map((type) => {
            return (
              <div
                className="grid grid-cols-2 items-center space-y-1"
                key={type.type.name}
              >
                <div className="text-gray-500">{type.type.name}</div>
              </div>
            );
          })}
        </div>
      )}

      {showStats && (
        <div className="space-y-2">
          <header className="font-medium text-gray-500">Description</header>
          {apidata?.flavor_text_entries
            ?.slice(10, 11)
            .map((flavor_text: any) => {
              return (
                <div className="items-center" key={flavor_text.flavor_text}>
                  <div className="text-gray-500">{flavor_text.flavor_text}</div>
                </div>
              );
            })}
        </div>
      )}

      {showStats && (
        <div className="space-y-2">
          <header className="font-medium text-gray-500">Stats</header>
          {pokemon.data?.data.stats.map((stat) => {
            return (
              <div
                className="grid grid-cols-2 items-center space-y-1"
                key={stat.stat.name}
              >
                <div className="text-gray-500">{stat.stat.name}</div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 h-3">
                    <div
                      style={{ width: `${Math.min(100, stat.base_stat)}%` }}
                      className="h-full bg-yellow-400"
                    ></div>
                  </div>
                  <div className="text-sm text-gray-400 w-8 text-right">
                    {stat.base_stat}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showStats && (
        <div className="space-y-2">
          <header className="font-medium text-gray-500">Moves</header>
          {pokemon.data?.data?.moves.slice(0, 6).map((move) => {
            return (
              <div
                className="grid grid-cols-2 items-center space-y-1"
                key={move.move.name}
              >
                <div className="text-gray-500">{move.move.name}</div>
              </div>
            );
          })}
        </div>
      )}

      {showStats && (
        <div className="space-y-2">
          <header className="font-medium text-gray-500">Weakness</header>
          {type.damage_relations?.double_damage_from.map(
            (double_damage_from: any) => {
              return (
                <div
                  className="grid grid-cols-2 items-center space-y-1"
                  key={double_damage_from.name}
                >
                  <div className="text-gray-500">{double_damage_from.name}</div>
                </div>
              );
            }
          )}
        </div>
      )}
    </Link>
  );
};

PokemonCard.defaultProps = {
  showStats: false,
};

export default PokemonCard;
