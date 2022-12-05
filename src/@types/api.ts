export type Stat = {
  base_stat: number;
  stat: {
    name: string;
  };
};
export type Moves = {
  move: {
    name: string;
    url: string;
  };
};
export type Types = {
  type: {
    name: string;
    url: string;
  };
};
export type PokemonResponseResult = {
  name: string;
  url: string;
};

export type PokemonsResponse = {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonResponseResult[];
  };
};

export type PokemonResponse = {
  data: {
    id: number;
    name: string;
    moves: Moves[];
    types: Types[];
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
        "official-artwork": {
          front_default: string;
        };
      };
    };
    stats: Stat[];
  };
};
