import strategy from 'strategy/resolvers';

const resolvers = {
  Query: { ...strategy.Query },
  Mutation: { ...strategy.Mutation },
};

export default resolvers;
