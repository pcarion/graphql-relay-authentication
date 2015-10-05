import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema
} from 'graphql';

import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions
} from 'graphql-relay';

const example = {
  id: 1,
  text: 'Hello World!',
  version: 2
};

const user = {
  id: 17,
  email: 'pcarion@gmail.com',
  password: 'xyz123'
}

/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */
var { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { id, type } = fromGlobalId(globalId);
    if (type === 'Example')
      return example;
    return null;
  },
  (obj) => {
    return exampleType;
  }
);

var userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    email: {
      type: GraphQLString,
      description: 'email of the user'
    },
    password: {
      type: GraphQLString,
      description: 'encoded password'
    }
  }),
  interfaces: [ nodeInterface ]
});

var exampleType = new GraphQLObjectType({
  name: 'Example',
  fields: () => ({
    id: globalIdField('Example'),
    text: {
      type: GraphQLString,
      description: 'Hello World'
    },
    version: {
      type: GraphQLInt,
      description: 'version'
    }
  }),
  interfaces: [ nodeInterface ]
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    example: {
      type: exampleType,
      resolve: () => example
    },
    user: {
      type: userType,
      resolve: () => user
    }
  })
});

export var Schema = new GraphQLSchema({
  query: queryType
});