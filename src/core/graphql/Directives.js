import { SchemaDirectiveVisitor } from 'graphql-tools';
import { GraphQLNonNull, GraphQLScalarType } from 'graphql';

class LimitedLengthType extends GraphQLScalarType {
  constructor(type, maxLength, minLength) {
    super({
      name: 'String',

      // For more information about GraphQLScalar type (de)serialization,
      // see the graphql-js implementation:
      // https://github.com/graphql/graphql-js/blob/31ae8a8e8312/src/type/definition.js#L425-L446

      serialize(value) {
        const newValue = type.serialize(value);
        if (minLength && minLength > newValue.length) throw new Error(`Min Length is ${minLength}`);
        if (maxLength && maxLength < newValue.length) throw new Error(`Max Length is ${maxLength}`);
        return newValue;
      },

      parseValue(value) {
        const newValue = type.parseValue(value);
        if (minLength && minLength > newValue.length) throw new Error(`Min Length is ${minLength}`);
        if (maxLength && maxLength < newValue.length) throw new Error(`Max Length is ${maxLength}`);
        return newValue;
      },

      parseLiteral(ast) {
        const newValue = type.parseLiteral(ast);
        if (minLength && minLength > newValue.length) throw new Error(`Min Length is ${minLength}`);
        if (maxLength && maxLength < newValue.length) throw new Error(`Max Length is ${maxLength}`);
        return newValue;
      },

    });
  }
}

class LengthDirective extends SchemaDirectiveVisitor {
  visitInputFieldDefinition(field) {
    this.wrapType(field);
  }

  visitFieldDefinition(field) {
    this.wrapType(field);
  }

  // Replace field.type with a custom GraphQLScalarType that enforces the
  // length restriction.
  wrapType(field) {
    if (field.type instanceof GraphQLNonNull && field.type.ofType instanceof GraphQLScalarType) {
      field.type = new GraphQLNonNull(new LimitedLengthType(field.type.ofType, this.args.max, this.args.min)); //eslint-disable-line
    } else if (field.type instanceof GraphQLScalarType) {
      field.type = new LimitedLengthType(field.type, this.args.max, this.args.min);//eslint-disable-line
    } else {
      throw new Error(`Not a scalar type: ${field.type}`);
    }
  }
}

export default LengthDirective;
