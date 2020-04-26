import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';

import _ from 'lodash';
import Authors from '../data/authors';
import { GraphQLList } from 'graphql/type';


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represent an author',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    twitterHandle: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents a Post',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(post) {
        return _.find(Authors, a => a.id === post.author_id);
      },
    },
  }),
});
const Department = new GraphQLObjectType({
  name: 'Department',
  description: 'This represent an Department',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
const ListingType = new GraphQLObjectType({
  name: 'Listing',
  description: 'This represents a listing',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    description: { type: GraphQLString },
    website: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    departments: { type: new GraphQLList(ListingType) }
  }),
});

export { AuthorType, PostType, ListingType, Department};
