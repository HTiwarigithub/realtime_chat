import { gql } from 'apollo-server-express';
export const typeDefs = gql`
    type Query {
        listusers:[Signup!]!
        messages:[Message!]!
        groups: [Group!]!
        users: [User!]!
        joins: [Join!]!
    },

    type Signup {
        _id: ID!
        email: String!
        password: String!
    }
    type Message {
        _id: ID!
        groupid: String!
        userid: String!
        message: String!
    }
    type Group {
        _id: ID!
        userId: String!
        name: String!
        groupType: String!
    }
    type User {
        _id: ID!
        name: String!
        roll: String!
        email: String!
        password: String!
    }
    type Join {
        _id: ID!
        groupid: String!
        userid: String!
        name: String!
    }
    type Mutation {

        Signup(
            email: String!
            password: String!
        ): Signup!
        createMessage(
            groupid: String!
            userid: String!
            message: String!
        ): Message!
        createGroup(
            userId: String!
            name: String!
            groupType: String!
        ): Group!
        createUser(
            name: String!
            roll: String!
            email: String!
            password: String!
        ): User!
        createJoin(
            groupid: String!
            userid: String!
            name: String!
        ): Join!
    }
`;