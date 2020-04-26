import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import {
  addNewListing,
  updateListing,
  deleteListing,
  addDepartment,
} from '../../controllers/listingController';
import { ListingType, Department } from '../types/rootTypes';
import seedDB from '../../controllers/utilityController';

const ListingMutationRootType = new GraphQLObjectType({
  name: 'ListingMutation',
  description: 'Change or create listing',
  fields: () => ({
    addListing: {
      type: ListingType,
      description: 'add a new listing',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        website: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return addNewListing(args);
      },
    },
    updateListing: {
      type: ListingType,
      description: 'update an existing listing',
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return updateListing(args);
      },
    },
    deleteListing: {
      type: ListingType,
      description: 'delete a listing',
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return deleteListing(args);
      },
    },
    seedDatabase: {
      type: GraphQLList(ListingType),
      description: 'seed the database with initial values',
      resolve() {
        return seedDB();
      },
    },
    addDepartment: {
      type: Department,
      description: 'add a new department',
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return addDepartment(args);
      },
    },
  }),
});

export default ListingMutationRootType;
