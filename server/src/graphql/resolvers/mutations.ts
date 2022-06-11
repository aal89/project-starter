import { gql } from 'apollo-server-express';
import { hash } from 'bcrypt';
import { validateOrReject } from 'class-validator';
import { User } from '../../entities/User';
import { DatabaseError, translateError, ValidationError } from '../../errors/translateError';
import { MutationResolvers } from '../generated/graphql';

const mutationTypeDefs = gql`
  scalar Void

  type Mutation {
    signup(username: String!, password: String!, name: String!): Void
  }
`;

const mutationResolvers: MutationResolvers = {
  signup: async (_, { username, password, name }) => {
    try {
      const user = new User();

      user.username = username;
      user.password = await hash(password, 12);
      user.name = name;

      await validateOrReject(user);

      await user.save();
    } catch (err) {
      const translatedError = translateError(err);
      if (translatedError === DatabaseError.Duplicate) {
        throw new Error('This username is already taken, please pick another');
      }

      if (translatedError === ValidationError.Username4MinLength) {
        throw new Error('Username needs to be at least 4 characters');
      }

      throw new Error('Something went wrong, please try again');
    }
  },
};

export { mutationTypeDefs, mutationResolvers };
