import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ApolloServer } from "apollo-server-express";
import session from "express-session";
import typeDefs from "./typedefs.js";
import resolvers from "./resolvers.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(express.static("public"));
app.set("trust proxy", 1); // trust first proxy

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // false for localhost and true in prod
  })
);

app.use("/static", express.static(path.join(__dirname, "public")));

server.applyMiddleware({ app });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/stars", (req, res) => {
  res.sendFile(path.join(__dirname, "/stars.html"));
});

app.get("/public/dist/stars.js", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/dist/stars.js"));
});

app.get("/kanban", (req, res) => {
  res.sendFile(path.join(__dirname, "/kanban.html"));
});

app.get("/public/dist/kanban.js", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/dist/kanban.js"));
});

app.get("/pokemon", (req, res) => {
  res.sendFile(path.join(__dirname, "/pokemon.html"));
});

app.get("/public/dist/pokemon.js", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/dist/pokemon.js"));
});

app.get("/addLessons", (req, res) => {
  res.sendFile(path.join(__dirname, "/addLessons.html"));
});

app.get("/public/dist/addLessons.js", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/dist/addLessons.js"));
});

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
);
