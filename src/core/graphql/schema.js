import { makeExecutableSchema } from 'graphql-tools';
import Base from 'core/graphql/base';
import Strategy from 'strategy/schema';
import resolvers from 'core/graphql/resolvers';
import LengthDirective from 'core/graphql/Directives';

export default makeExecutableSchema({
  typeDefs: [
    Base,
    Strategy,
  ],
  schemaDirectives: {
    length: LengthDirective,
  },
  resolvers,
  logger: { log: e => console.error(e) }, // eslint-disable-line no-console
});
