import { useEffect } from "react";
import { InView } from "react-intersection-observer";
import { useQuery } from "react-query";
import { PokemonResponseResult } from "../@types/api";
import Layout from "../components/Layout";
import PokemonCard from "../components/PokemonCard";
import { useApp } from "../states/AppState";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import("../App.css");

const Home: React.FC<{}> = () => {
  const { pokemons, filteredPokemons } = useApp();

  if (pokemons.isLoading) {
    return (
      <div>
        <Skeleton count={100} />
      </div>
    );
  }
  return (
    <Layout>
      <main className="container mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPokemons?.slice(3).map((pokemon: PokemonResponseResult) => (
            <InView
              key={pokemon.name}
              rootMargin="200px 0px"
              threshold={0.3}
              triggerOnce={true}
            >
              {({ inView, ref }) => {
                return inView ? (
                  <PokemonCard name={pokemon.name} />
                ) : (
                  <div
                    ref={ref}
                    className="w-full h-72 bg-gray-100 rounded-lg"
                  ></div>
                );
              }}
            </InView>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
