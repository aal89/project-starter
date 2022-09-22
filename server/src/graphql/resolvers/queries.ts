import { ok } from 'assert';
import { Permission } from '@project-starter/shared';
import { gql } from 'apollo-server-express';
import { getS3UploadUrl } from '../../aws';
import { randomFilename } from '../../utils/string';
import { ContextType } from '../apollo-server';
import { QueryResolvers } from '../generated/graphql';

const queryTypeDefs = gql`
  type ImageUploadParameters {
    url: String!
    filename: String!
  }

  type Query {
    getImageUploadUrl(contentType: String!): ImageUploadParameters!
  }
`;

const queryResolvers: QueryResolvers<ContextType> = {
  getImageUploadUrl: async (_, { contentType }, { userCan }) => {
    ok(userCan(Permission.LOGIN));
    ok(
      ['image/jpeg', 'image/bmp', 'image/png'].includes(contentType),
      'Unsupported image type, try another',
    );

    const filename = randomFilename('jpg');
    const url = await getS3UploadUrl(filename, contentType);

    return {
      url,
      filename,
    };
  },
};

export { queryTypeDefs, queryResolvers };
