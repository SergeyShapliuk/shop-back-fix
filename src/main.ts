import typeDefs from './schema';
import resolvers from './resolvers';
import {ApolloServer} from 'apollo-server';


const port = process.env.PORT || 4000


const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
});


server.listen({port}).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});