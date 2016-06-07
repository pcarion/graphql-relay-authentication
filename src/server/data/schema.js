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

import uuid from 'node-uuid';

class User {
  constructor(email, password) {
    this._id = uuid.v4();
    this._email = email;
    this._password = password;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }
}

class Example {
  constructor(text, version) {
    this._id = uuid.v4();
    this._text = text;
    this._version = version;
  }

  get id() {
    return this._id;
  }

  get text() {
    return this._text;
  }

  get version() {
    return this._version;
  }
}


const example = new Example('Hello World!',3);
const user = new User('pcarion@gmail.com', 'xyz123');

// let usersDirectory = new Map();

// function getUser(id) {
//   return usersDirectory.get(id);
// }

// function createUser(email, password) {
//   return new User(email, password);

// }

/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */
var { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { _id, type } = fromGlobalId(globalId);
    if (type === 'Example') {
      return example;
    } else if (type === 'User') {
      return user;
    }
    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else if (obj instanceof Example) {
      return exampleType;
    }
    return null;
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