const Base = `
type Query {
    dummy: Boolean
}

type Mutation {
    dummy: Boolean
}

type Meta {
    count: Int
}

scalar Url
scalar Date
enum Instrument {
  AUD_USD
  EUR_USD
  GBP_USD
}

directive @length(max: Int, min:Int) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION

`;

export default () => [Base];
