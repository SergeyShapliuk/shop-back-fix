import {createServer} from "http";
import typeDefs from './schema';
import resolvers from './resolvers';
import {ApolloServer} from 'apollo-server-express';

const express = require("express")
const cors = require("cors")
// const app = express()
//const httpServer = createServer(app)
const path = require("path")
const port = process.env.PORT || 4000
const whitelist = ["http://localhost:4000"]

// const startServer = async () => {
const app = express()
const httpServer = createServer(app)
const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))
app.use(express.static("public"))

app.get("*", (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"), {message: "Hello World!"});
});
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
});

// await server.start()
server.applyMiddleware({app, path: '/'})
httpServer.listen({port}, () =>
    console.log(`Server listening on localhost:4000${server.graphqlPath}`))
// }
// startServer()


// app.listen().then({port},() => {
//     console.log(`🚀  Server ready at ${port}`);
// });