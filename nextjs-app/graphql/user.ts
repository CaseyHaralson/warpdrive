import { gql } from "@apollo/client";

export const UserTypeDefs = gql`
    type User {
        name: String
        age: Int
    }
    type Query {
        users: [User]
    }
`;


export const UserResolvers = {
    Query: {
        users: () => {
            return [
                {
                    name: 'test1',
                    age: 123
                },
                {
                    name: 'test2',
                    age: 45
                }
            ]
        }
    }
};