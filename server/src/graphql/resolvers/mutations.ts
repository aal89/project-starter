import { gql } from 'apollo-server-express';
import { hash, compare } from 'bcrypt';
import { validateOrReject } from 'class-validator';
import { User } from '../../entities/User';
import { DatabaseError, translateError } from '../../errors/translateError';
import { createToken } from '../../token';
import { MutationResolvers } from '../generated/graphql';

const mutationTypeDefs = gql`
  scalar Void

  type LoginResult {
    user: User!
    accessToken: String!
    refreshToken: String!
  }

  type Mutation {
    signup(username: String!, password: String!, name: String!): Void
    login(username: String!, password: String!): LoginResult
  }
`;

const mutationResolvers: MutationResolvers = {
  signup: async (_, { username, password, name }) => {
    try {
      const user = new User();

      user.username = username;
      user.password = await hash(password, 12);
      user.name = name;

      const validationErrors = await validateOrReject(user);
      console.log(validationErrors);

      await user.save();
    } catch (err) {
      if (translateError(err) === DatabaseError.Duplicate) {
        throw new Error('This user already exists');
      }

      console.log(err);

      throw new Error('Something went wrong, please try again');
    }
  },
  login: async (_, { username, password }) => {
    const user = await User.findOneBy({ username });

    if (!user) {
      throw new Error('Unknown user');
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new Error('Incorrect password');
    }

    const accessToken = await createToken(user);

    return {
      user,
      accessToken,
      refreshToken: '',
    };
  },
};

export { mutationTypeDefs, mutationResolvers };
