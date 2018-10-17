import graphqlHTTP from 'express-graphql';
import cors from 'core/graphql/cors-handler';

import dataloaders from 'core/graphql/data-loaders';
import schema from 'core/graphql/schema';

class GraphqlHandler {
  static init(app) {
    app.use('/graphql', cors, graphqlHTTP(() => {
      const startTime = Date.now();
      return {
        schema,
        graphiql: true,
        context: { dataloaders: dataloaders() },
        extensions: () => ({
          timing: Date.now() - startTime,
        }),
      };
    }));
  }
}

export default GraphqlHandler;
