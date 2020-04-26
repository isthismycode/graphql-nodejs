# GraphQL

The Nodejs implementation for GraphQL.

### Setup GraphQL

Install GraphQL from npm

```sh
npm install --save graphql
```

GraphQL.js provides two important capabilities: building a type schema, and
serving queries against that type schema.

First, build a GraphQL type schema which maps to your code base.

```js
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represent an author',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    twitterHandle: { type: GraphQLString },
  }),
});

```

This defines a simple schema with one type and fields, that resolves
to a fixed value. The `resolve` function can return a value, a promise,
or an array of promises. 

Then, serve the result of a query against that type schema.

```js
const ListingMutationRootType = new GraphQLObjectType({
  name: 'Author',
  description: 'Change or create listing',
  fields: () => ({
    addListing: {
      type: ListingType,
      description: 'add a new listing',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        twitterHandle: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, args) {
        const listing = (new Business(args)).save();
        return listing;
      },
    },
  })
})
```

This runs a query fetching the one field defined. The `graphql` function will
first ensure the query is syntactically and semantically valid before executing
it, reporting errors otherwise.

```js
const ListingQueryRootType = new GraphQLObjectType({
  name: 'ListingQuery',
  description: 'Listing Application Schema Query Root',
  fields: () => ({
       recentListings: {
      type: GraphQLList(ListingType),
      description: 'Get recent business listings',
      resolve() {
         const listings =  Listing.find({})
            .sort({ created: 'desc' })
            .limit(6);

        return listings;
        };
      },
    },
  })
})
```


### Using in a Browser

GraphQL.js is a general purpose library and can be used both in a Node server
and in the browser. As an example, the (http://hostname:port/graphiql/)
tool is built with GraphQL.js!

