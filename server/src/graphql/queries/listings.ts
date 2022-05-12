import { Listing as ListingData } from '@huistat/datamodel/src/entity/Listing';
import { gql } from 'apollo-server-express';
import { ContextType } from '../apollo-server';
import { Listing, QueryResolvers } from '../generated/graphql';

const typeDefs = gql`
  type Query {
    listings: [Listing]!
  }
`;

const toGqlListing = (listing: ListingData): Listing => ({
  ...listing,
  id: String(listing.id),
  offeredSince: listing.offeredSince?.toISOString(),
  saleDate: listing.saleDate?.toISOString(),
  pictures: listing.pictures?.map((p) => ({
    id: String(p.id),
    url: p.url,
  })),
});

const resolvers: QueryResolvers<ContextType> = {
  listings: async (root, args, { roles, permissions }, info) => {
    const listings = await ListingData.find();
    return listings.map(toGqlListing);
  },
};

export { typeDefs, resolvers };
