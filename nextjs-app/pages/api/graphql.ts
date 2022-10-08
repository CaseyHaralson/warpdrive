import { createYoga, createSchema } from 'graphql-yoga'
import { NextApiRequest, NextApiResponse } from "next";
import { TypeDefs, Resolvers } from '../../graphql/schema';

export const config = {
    api: {
        // disable body parsing (required for file uploads)
        bodyParser: false
    }
};

export default createYoga<{
    req: NextApiRequest
    res: NextApiResponse
}>({
    graphqlEndpoint: '/api/graphql',
    schema: createSchema({
        typeDefs: TypeDefs,
        resolvers: Resolvers()
    })
});