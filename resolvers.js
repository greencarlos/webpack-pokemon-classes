import fetch from "node-fetch";

const pokemonLessons = {};
const pokemonCache = {};
const mySession = { pokemon: "" };

const allLessons = await fetch("https://c0d3.com/api/lessons").then((res) =>
  res.json()
);

const validLessons = new Set(
  allLessons.map((lesson) => lesson.title.toLowerCase())
);

const allPokemon = await fetch(
  "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1280"
)
  .then((res) => res.json())
  .then((res) => {
    res.results.forEach(async (mon) => {
      pokemonCache[mon.name] = {
        name: mon.name,
        image: () =>
          fetch(mon.url)
            .then((res) => res.json())
            .then((res) => res.sprites.front_default),
        lessons: [],
        url: mon.url,
      };
    });
    return res.results;
  });

const resolvers = {
  Mutation: {
    unenroll: (_a, args, contextValue) => {
      const pokemon = contextValue.session.pokemon;
      const argsTitle = args.title.toLowerCase();

      if (!pokemon) return [];
      if (!validLessons.has(argsTitle)) return;

      const pokeInfo = pokemonCache[pokemon] || {};
      const lessons = pokemonLessons[pokemon] || {};

      if (!lessons[args.title]) return pokeInfo;
      lessons[args.title] = false;

      const unenrolled = pokeInfo.lessons.filter((enrolled) => {
        const lesson = enrolled[0].title.toLowerCase();
        return lesson !== argsTitle;
      });

      pokeInfo.lessons = unenrolled;
      pokemonLessons[pokemon] = lessons;

      return pokeInfo;
    },
    enroll: (_a, args, contextValue) => {
      const pokemon = contextValue.session.pokemon;
      const argsTitle = args.title.toLowerCase();

      if (!pokemon) return [];
      if (!validLessons.has(argsTitle)) return;

      const pokeInfo = pokemonCache[pokemon] || {};
      const lessons = pokemonLessons[pokemon] || {};

      if (lessons[argsTitle]) return pokeInfo;
      lessons[argsTitle] = true;

      const enrolled = allLessons.filter((lesson) => {
        return lesson.title.toLowerCase() === argsTitle;
      });

      pokeInfo.lessons.push(enrolled);
      pokemonLessons[pokemon] = lessons;

      return pokeInfo;
    },
  },
  Query: {
    lessons: () => {
      return allLessons;
    },
    user: (_a, args, contextValue) => {
      if (!contextValue.session.pokemon) return null;

      const pokemon = contextValue.session.pokemon;
      const pokeInfo = pokemonCache[pokemon];
      const lessons = pokemonLessons[pokemon] || {};

      pokeInfo.lessons = Object.keys(lessons).map((str) => {
        return {
          title: str,
        };
      });
      return pokeInfo;
    },
    pokemons: () => {
      return allPokemon;
    },
    login: async (_a, args, contextValue) => {
      const pokeInfo = pokemonCache[args.pokemon] || {};
      contextValue.session.pokemon = args.pokemon;
      return pokeInfo;
    },
    getPokemon: (_a, args) => {
      const pokeInfo = pokemonCache[args.str] || {};
      return pokeInfo;
    },
    search: (_a, args) => {
      return allPokemon.filter((pokemon) => {
        return pokemon.name.includes(args.str);
      });
    },
  },
};

export default resolvers;
