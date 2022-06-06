import { gql } from 'apollo-server-express';
import { hash, compare } from 'bcrypt';
import { User } from '../../entities/User';
import { createToken } from '../../token';
import { MutationResolvers } from '../generated/graphql';

const mutationTypeDefs = gql`
  type LoginResult {
    user: User!
    accessToken: String!
    refreshToken: String!
  }

  type Mutation {
    signup(username: String!, password: String!, name: String!): Boolean!
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

      await user.save();

      return true;
    } catch {
      return false;
    }
  },
  login: async (_, { username, password }) => {
    const user = await User.findOneByOrFail({ username });
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
