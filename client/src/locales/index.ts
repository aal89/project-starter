import { ApolloError } from '@apollo/client';
import { errorCode } from '@project-starter/shared/build';

type GraphQLErrors = Pick<ApolloError, 'graphQLErrors'>;
type Extensions = ReturnType<ReturnType<typeof errorCode>>;

const hasGraphQLErrors = (o?: any): o is GraphQLErrors => Array.isArray(o?.graphQLErrors);
const isExtention = (o?: any): o is Extensions => o && typeof o?.code === 'string';

export const getFormatId = (err: Error | unknown, defaultId?: { id: string }) => {
  if (hasGraphQLErrors(err) && !!err.graphQLErrors.length) {
    const [{ extensions }] = err.graphQLErrors;

    if (isExtention(extensions)) {
      return { formatId: { id: extensions.code }, meta: extensions.meta };
    }
  }

  return { formatId: defaultId ?? { id: 'Generic.UnknownError' } };
};
