import Base from "core/graphql/base";

const Strategy = `
extend type Query{
  strategies(postedBy:ID!):[Strategy]
  events:[Event]
  yearlyReports(strategyId:ID!):[YearlyReport]
  monthlyReports(strategyId:ID!, instrument:Instrument!):[MonthlyReport]
}

extend type Mutation{
  backtest(strategyId:ID!): [YearlyReport]
  addStrategy(params: StrategyInput): [Strategy]
  deleteStrategy(strategyId:ID!): ID
}

type Strategy {
  _id: ID!
  name: String!
  description: String
  postedBy: ID!
  createdTime: Date
  events: [String]
  code: String
}

type Event {
  name: String!
  description: String
  howToUse: String
  payload: String
  example: String
}

interface Report{
  earn_2014: Int
  earn_2015: Int
  earn_2016: Int
  earn_2017: Int
  earn_2018: Int
  maxLoss_2014: Int
  maxLoss_2015: Int
  maxLoss_2016: Int
  maxLoss_2017: Int
  maxLoss_2018: Int
  maxProfit_2014: Int
  maxProfit_2015: Int
  maxProfit_2016: Int
  maxProfit_2017: Int
  maxProfit_2018: Int
}
type YearlyReport implements Report{
  strategyId: ID!
  instrument: Instrument!
  earn_2014: Int
  earn_2015: Int
  earn_2016: Int
  earn_2017: Int
  earn_2018: Int
  maxLoss_2014: Int
  maxLoss_2015: Int
  maxLoss_2016: Int
  maxLoss_2017: Int
  maxLoss_2018: Int
  maxProfit_2014: Int
  maxProfit_2015: Int
  maxProfit_2016: Int
  maxProfit_2017: Int
  maxProfit_2018: Int
}

type MonthlyReport implements Report{
  month: String!
  earn_2014: Int
  earn_2015: Int
  earn_2016: Int
  earn_2017: Int
  earn_2018: Int
  maxLoss_2014: Int
  maxLoss_2015: Int
  maxLoss_2016: Int
  maxLoss_2017: Int
  maxLoss_2018: Int
  maxProfit_2014: Int
  maxProfit_2015: Int
  maxProfit_2016: Int
  maxProfit_2017: Int
  maxProfit_2018: Int
}
input StrategyInput{
  postedBy:ID!
  code:String!
  description:String!
  events: [String]!
  name:String @length(min: 5)
}
`;

export default () => [Strategy, Base];
