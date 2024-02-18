import Image from "next/image";
import Link from "next/link";

type Pokemon = {
  name: string;
  url: string;
  sprite: string;
  types: string[];
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'normal':
      return 'bg-gray-400';
    case 'fire':
      return 'bg-red-500';
    case 'water':
      return 'bg-blue-400';
    case 'electric':
      return 'bg-yellow-400';
    case 'grass':
      return 'bg-green-400';
    case 'ice':
      return 'bg-blue-200';
    case 'fighting':
      return 'bg-red-700';
    case 'poison':
      return 'bg-purple-400';
    case 'ground':
      return 'bg-yellow-700';
    case 'flying':
      return 'bg-blue-300';
    case 'psychic':
      return 'bg-purple-600';
    case 'bug':
      return 'bg-green-600';
    case 'rock':
      return 'bg-gray-600';
    case 'ghost':
      return 'bg-purple-700';
    case 'dark':
      return 'bg-gray-800';
    case 'dragon':
      return 'bg-indigo-600';
    case 'steel':
      return 'bg-gray-500';
    case 'fairy':
      return 'bg-pink-300';
    default:
      return 'bg-gray-400';
  }
}


async function fetchPokemon(): Promise<Pokemon[]> {
  const result = await fetch("https://pokeapi.co/api/v2/pokemon");
  const jsonResult = await result.json();
  const pokemonList: Pokemon[] = await Promise.all(jsonResult.results.map(async (pokemon: any) => {
    const pokemonDataResult = await fetch(pokemon.url);
    const pokemonData = await pokemonDataResult.json();
    const types = pokemonData.types.map((type: any) => type.type.name);
    return {
      name: pokemonData.name,
      url: pokemon.url,
      sprite: pokemonData.sprites.other.dream_world.front_default,
      types: types
    };
  }));
  return pokemonList;
}

export default async function Home() {
  const pokemons = await fetchPokemon();

  return (
    <>
    <main className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Lista de Pokemons</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon: Pokemon, index: number) => {
          const id = pokemon.url.split("/")[6];
          return (
            <Link href={`/pokemon/${id}`} key={index}>
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                <div className="relative w-48 h-48">
                  <Image
                    src={pokemon.sprite}
                    alt="imagem_pokemon"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p className="text-xl font-semibold">{("00" + id).slice(-3)}</p>
                <p className="text-lg">{pokemon.name}</p>
                <div className="flex">
                  {pokemon.types.map((type, index) => (
                    <p key={index} className={`ml-1 text-sm rounded-md px-2 py-1 ${getTypeColor(type)}`}>{type}</p>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
    </>
  );
}
