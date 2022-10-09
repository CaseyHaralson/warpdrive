import { gql } from "@apollo/client";
import { findStocks } from "../util/dbreader";

export const StockTypeDefs = gql`
    type Stock {
        symbol: String!
        values: [StockValue]!
    }
    type StockValue {
        date: String!
        value: String!
    }

    type Query {
        stocks(symbol: String): [Stock]
    }
`;


export const StockResolvers = {
    Query: {
        stocks(obj, { symbol }, context, info) {
            return findStocks(symbol);
        }
    }
};