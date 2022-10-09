import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { IResolvers } from '@graphql-tools/utils';
import { UserTypeDefs, UserResolvers } from "./user";
import { StockTypeDefs, StockResolvers } from "./stocks";

export const TypeDefs = mergeTypeDefs([UserTypeDefs, StockTypeDefs]);

export function Resolvers<TContext = any>(): IResolvers<any, TContext> | Array<IResolvers<any, TContext>> {
    return mergeResolvers([UserResolvers, StockResolvers]);
};