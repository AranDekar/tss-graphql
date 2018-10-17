import { GraphQLScalarType, GraphQLError } from 'graphql';
import { Kind } from 'graphql/language';

const validateDate = (value) => {
  if (Number.isNaN(Date.parse(value))) {
    throw new GraphQLError('Query error: not a valid date', [value]);
  }
};

// const Instruments = Object.freeze({
//   AUD_USD: Symbol('AUD_USD'),
//   EUR_USD: Symbol('EUR_USD'),
//   GBP_USD: Symbol('GBP_USD'),
// });
// const validateInstrument = (value) => {
//   if (!Object.prototype.hasOwnProperty.call(Instruments, value)) {
//     throw new GraphQLError('Query error: not a valid instrument', [value]);
//   }
// };

const ScalarTypes = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date type',
    parseValue(value) {
      // value comes from the client, in variables
      validateDate(value);
      return new Date(value); // sent to resolvers
    },
    parseLiteral(ast) {
      // value comes from the client, inlined in the query
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(`Query error: Can only parse dates strings, got a: ${ast.kind}`, [ast]);
      }
      validateDate(ast.value);
      return new Date(ast.value); // sent to resolvers
    },
    serialize(value) {
      // value comes from resolvers
      return value.toISOString(); // sent to the client
    },
  }),
  // Instrument: new GraphQLScalarType({
  //   name: 'Instrument',
  //   description: 'Instrument type',
  //   parseValue(value) {
  //     // value comes from the client, in variables
  //     validateInstrument(value);
  //     return new Date(value); // sent to resolvers
  //   },
  //   parseLiteral(ast) {
  //     // value comes from the client, inlined in the query
  //     if (ast.kind !== Kind.STRING) {
  //       throw new GraphQLError(`Query error: Can only parse strings, got a: ${ast.kind}`, [ast]);
  //     }
  //     validateInstrument(ast.value);
  //     return ast.value; // sent to resolvers
  //   },
  //   serialize(value) {
  //     // value comes from resolvers
  //     return value; // sent to the client
  //   },
  // }),
};

export default ScalarTypes;
