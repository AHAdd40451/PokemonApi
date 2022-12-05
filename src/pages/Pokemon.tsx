import { useNavigate, useParams } from "react-router";
import Layout from "../components/Layout";
import PokemonCard from "../components/PokemonCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useFindPokemon } from "../hooks/useFindPokemon";

const Pokemon: React.FC<{}> = () => {
  const navigate = useNavigate();

  const { pokemon: pokemonName } = useParams();

  const pokemon = useFindPokemon(pokemonName);
  const goBack = () => navigate(-1);

  if (pokemon.isLoading) {
    return <Skeleton count={100} />;
  }
  return (
    <Layout>
      <div className="container mx-auto px-6 md:px-0">
        {pokemon.data && (
          <div className="max-w-md mx-auto space-y-6">
            <PokemonCard name={pokemon.data.data.name} showStats />

            <div
              role="button"
              className="block text-lg  text-gray  bg-gray-300 rounded w-fit p-1 flex align-center justify-center"
              onClick={goBack}
            >
              Back
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Pokemon;
