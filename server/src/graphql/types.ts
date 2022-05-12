import { gql } from 'apollo-server-express';

export const types = gql`
  type Picture {
    id: ID!
    url: String!
  }

  type Listing {
    id: ID!
    thumbnail: String!
    address: String!
    url: String!
    postalCode: String!
    city: String!
    askingPrice: Int!
    livingSpace: Int!
    rooms: Int!
    brokerage: String!
    plotArea: Int
    pictures: [Picture]
    offeredSince: String
    saleDate: String
    saleDuration: Int
    description: String
  }
`;
