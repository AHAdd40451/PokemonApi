import { PokemonClient } from "pokenode-ts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFindPokemon } from "../hooks/useFindPokemon";

import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
    const api = new PokemonClient();
    api
      .getPokemonSpeciesByName(name)
      .then((data) => setApidata(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (Id) {
      async function getUsers() {
        const { data } = await axios.get<any>(
          `https://pokeapi.co/api/v2/type/${Id}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        setType(data);
        return data;
      }
      getUsers();
    }
  }, [Id]);
  if (pokemon.isLoading) {
    return <Skeleton count={5} />;
  }
  const otherSprites = pokemon.data?.data.sprites.other;

  return (
    <Link
      to={`/${name}`}
      className="group block w-full bg-gray-50 border border-gray-100 rounded-lg p-4 transition transform space-y-8 hover:shadow hover:scale-105"
    >
      <div className="w-full h-56 flex justify-center">
        <img
          className="w-full h-full object-contain"
          src={otherSprites?.["official-artwork"].front_default}
          alt={pokemon.data?.data.name}
        />
      </div>
      <div className="font-medium text-center capitalize text-xl text-gray-500 transition group-hover:text-gray-700 text-align-center">
        {pokemon.data?.data.name}
      </div>

      {/* Types */}
      {showStats && (
        <div className="flex flex-col gap-2">
          <header className="font-medium text-gray w-full text-center">
            Types
          </header>
          {pokemon.data?.data?.types.map((type) => {
            return (
              <div key={type.type.name}>
                <div className="text-gray font-bold	antialiased whitespace-nowrap capitalize text-xs bg-yellow-400 p-1 rounded text-center">
                  {type.type.name}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Description */}
      {showStats && (
        <div className="space-y-2">
          <header className="font-medium text-gray  ">Description</header>
          {apidata?.flavor_text_entries
            ?.slice(10, 11)
            .map((flavor_text: any) => {
              return (
                <div className="items-center" key={flavor_text.flavor_text}>
                  <div className="text-gray-500 capitalize ">
                    {flavor_text.flavor_text}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Stats */}
      {showStats && (
        <div className="space-y-2">
          <header className="font-medium text-gray capitalize">Stats</header>
          {pokemon.data?.data.stats.map((stat) => {
            return (
              <div
                className="grid grid-cols-2 items-center space-y-1 capitalize"
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

      {/* Moves */}
      {showStats && (
        <div className="flex flex-row flex-wrap gap-5 text-justify w-fit ">
          <header className="font-medium text-gray w-full text-center">
            Moves
          </header>

          {pokemon.data?.data?.moves.slice(0, 6).map((move) => {
            return (
              <div>
                <div
                  className="text-gray font-bold	 whitespace-nowrap capitalize text-xs bg-yellow-400 p-1 rounded text-center"
                  key={move.move.name}
                >
                  {move.move.name}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Weakness */}
      {showStats && (
        <div className="space-y-2  flex-col gap-10 text text-center capitalize">
          <header className="font-medium text-gray">Weakness</header>
          {type.damage_relations?.double_damage_from.map(
            (double_damage_from: any) => {
              return (
                <div className="space-y-1" key={double_damage_from.name}>
                  <div className="text-gray mt-5 bg-yellow-400 p-1 rounded font-bold	">
                    {double_damage_from.name}
                  </div>
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
