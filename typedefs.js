const typeDefs = `#graphql
  type Challenge {
    id: Int
    description: String
    title: String
    order: String
    createdAt: String
    updatedAt: String
  }

  type Pokemon {
    image: String 
    name: String
  }

	 type Lesson {
    title: String
  }

  type Monster {
    name: String
  }

	type User {
    name: String
    image: String
    lessons: [Lesson]
  }

  type Query {
		lessons: [Lesson]
    pokemons: [Pokemon]
    search(str: String): [Pokemon]
    getPokemon(str: String): Pokemon
    login(pokemon: String): Pokemon
    user: User
  }

	 type Mutation {
    enroll(title: String): User
    unenroll(title: String): User
  }
`;

export default typeDefs
