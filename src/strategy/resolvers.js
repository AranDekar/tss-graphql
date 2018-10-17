import strategyService from 'strategy/StrategyService';

const resolvers = {
  Query: {
    strategies: (_, { postedBy }) => strategyService.getStrategiesByUser(postedBy),
    events: () => strategyService.getEvents(),
    yearlyReports: (_, { strategyId }) => strategyService.getYearlyReport(strategyId),
    monthlyReports: (_, { strategyId, instrument }) => strategyService.getMonthlyReport(strategyId, instrument),
  },
  Mutation: {
    backtest: (_, { strategyId }) => strategyService.backtest(strategyId),
    deleteStrategy: (_, { strategyId }) => strategyService.deleteStrategy(strategyId),
    addStrategy: (_, input) => strategyService.addStrategy(input.params),
  },
  Report: {
    __resolveType: (object) => {
      if (object.month) return 'MonthlyReport';
      return 'YearlyReport';
    },
  },
};

export default resolvers;
