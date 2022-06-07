import { ApolloServer } from 'apollo-server';

import typeDefs from './schema';
import resolvers from './resolvers';

const app = express();
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true,
    playground: true,
});
server.applyMiddleware({ app });
app.get('/', (req, res) => {
  res.send('hello');
});
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=> {
    console.log(`🚀  Server ready at ${PORT}`);
});
