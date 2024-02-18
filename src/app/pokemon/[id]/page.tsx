type PokemonParam = {
    params: {
        id: string;
    }
}

type PokemonDetails = {
    id: number;
    name: string;
    ability: string;
    baseExperience: number;
    height: number;
    weight: number;
    sprite: string;
    spriteShiny: string;
    types: string[];
    stats: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    };
}

async function fetchPokemon(id: string): Promise<PokemonDetails> {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { next: { revalidate: 3600 } });
    const jsonResult = await result.json();
    const stats: any = {};
    const types = jsonResult.types.map((type: any) => type.type.name);
    jsonResult.stats.forEach((stat: any) => {
        const statName = stat.stat.name;
        const statValue = stat.base_stat;
        stats[statName] = statValue;
        if (statName === 'special-attack') {
            stats['specialAttack'] = statValue;
        } else if (statName === 'special-defense') {
            stats['specialDefense'] = statValue;
        } else {
            stats[statName] = statValue;
        }
    });
    //console.log(jsonResult);
    return ({
        id: jsonResult.id,
        name: jsonResult.name,
        ability: jsonResult.abilities[0].ability.name,
        baseExperience: jsonResult.base_experience,
        height: jsonResult.height,
        weight: jsonResult.weight,
        sprite: jsonResult.sprites.other.dream_world.front_default,
        spriteShiny: jsonResult.sprites.other.dream_world.front_shiny,
        types: types,
        stats: stats,
    })
}


export default async function Pokemon({ params: { id } }: PokemonParam) {
    const pokemon = await fetchPokemon(id);

    const getTypeBackgroundColor = (type: string) => {
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
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'normal':
                return 'text-gray-400';
            case 'fire':
                return 'text-red-500';
            case 'water':
                return 'text-blue-400';
            case 'electric':
                return 'text-yellow-400';
            case 'grass':
                return 'text-green-400';
            case 'ice':
                return 'text-blue-200';
            case 'fighting':
                return 'text-red-700';
            case 'poison':
                return 'text-purple-400';
            case 'ground':
                return 'text-yellow-700';
            case 'flying':
                return 'text-blue-300';
            case 'psychic':
                return 'text-purple-600';
            case 'bug':
                return 'text-green-600';
            case 'rock':
                return 'text-gray-600';
            case 'ghost':
                return 'text-purple-700';
            case 'dark':
                return 'text-gray-800';
            case 'dragon':
                return 'text-indigo-600';
            case 'steel':
                return 'text-gray-500';
            case 'fairy':
                return 'text-pink-300';
            default:
                return 'text-gray-400';
        }
    };
    

    const containerClassName = `flex flex-col items-center justify-center ${getTypeBackgroundColor(pokemon.types[0])}`;

    return (
        <main className="flex flex-col items-center justify-center min-h-screen py-8 sm:py-12 bg-gray-50">
            <section className="w-full max-w-4xl p-1 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-around">
                {pokemon && (
                    <>
                        <div className={containerClassName}>
                            <p className="text-lg font-semibold">{pokemon.id}</p>
                            <p className="text-lg font-semibold">{pokemon.name}</p>
                            <img
                                src={pokemon.sprite}
                                alt='imagem_pokemon'
                                width={250}
                                height={250}
                                className="mt-4"
                            />
                            <div className="flex">
                                <p className="text-base sm:text-lg mr-4">Height: {pokemon.height}</p>
                                <p className="text-base sm:text-lg">Weight: {pokemon.weight}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex">
                                {pokemon.types.map((type, index) => (
                                    <p key={index} className={`text-base sm:text-lg mr-2 ${getTypeColor(type)}`}>{type}</p>
                                ))}
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold uppercase mb-4 sm:mb-4">Status</h2>
                            <p className="text-base sm:text-lg">HP: {pokemon.stats.hp}</p>
                            <p className="text-base sm:text-lg">Attack: {pokemon.stats.attack}</p>
                            <p className="text-base sm:text-lg">Defense: {pokemon.stats.defense}</p>
                            <p className="text-base sm:text-lg">Special Attack: {pokemon.stats.specialAttack}</p>
                            <p className="text-base sm:text-lg">Special Defense: {pokemon.stats.specialDefense}</p>
                            <p className="text-base sm:text-lg">Speed: {pokemon.stats.speed}</p>
                            <p className="text-base sm:text-lg">Ability: {pokemon.ability}</p>
                            <p className="text-base sm:text-lg">Base EXP: {pokemon.baseExperience}</p>
                        </div>
                    </>
                )}
            </section>
        </main>
    )
}