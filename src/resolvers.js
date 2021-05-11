import db from './db';
import { ObjectId } from 'mongodb';

export const resolvers = {
    Query: {
        
        listusers: () => getUsers(),
        messages: () => listMessages(),
        groups: () => listGroups(),
        users: () => listUsers(),
        joins: () => listJoins()
    },
    Mutation: {
        
        Signup:(_, {
            email, password
        }) => Signup({ email, password}),

        createMessage:(_, {
            groupid, userid, message
        }) => createMessage({ groupid, userid, message}),

        createGroup: (_, {
            userId, name, groupType
        }) => createGroup({ userId, name, groupType }),

        createUser: (_, {
            name, roll, email, password
        }) => createUser({ name, roll, email, password }),

        createJoin: (_, {
            groupid, userid, name
        }) => createJoin({ groupid, userid, name })
    }
};

// checkUserRole
const checkUserRole = (_id) => db.get().collection('users').findOne({
        _id: ObjectId(_id), roll: "admin"
    });


//checkGroupID
const checkGroupID = (_id) => db.get().collection('joins').findOne({
    _id: ObjectId(_id), roll: "609a2c0794207a06fc207506"
});


// groups
const createGroup = async ({ userId, name, groupType }) => {
    const valid = await checkUserRole(userId);
    if (valid) {
        const {
            ops: [ databaseResponse ]
        } = await db.get().collection('groups').insertOne({ userId, name, groupType });
        return databaseResponse ?? { message: 'something went wrong while creating group' };
    };
    return null;
};
    
const listGroups = () => db.get().collection('groups').find().toArray();

// messages
const createMessage = async ({ groupid, userid, message }) => {
        const {
            ops: [ databaseResponse ]
        } = await db.get().collection('messages').insertOne({ groupid, userid, message });
        return databaseResponse ?? { message: 'somthing went wrong while sending messages' };
    };
  

const listMessages = () => db.get().collection('messages').find().toArray();

// signup
const Signup = async (input) => {
    const {
        ops: [ databaseResponse ]
    } = await db.get().collection('signups').insertOne(input);
    return databaseResponse ?? { message: 'something went wrong while signing up' };
};

const getUsers = () => db.get().collection('signups').find().toArray();

// Users
const createUser = async ({ name, roll, email, password }) => {
    const {
        ops: [ databaseResponse ]
    } = await db.get().collection('users').insertOne({ name, roll, email, password });
    return databaseResponse ?? { message: 'somthing went wrong while creating user' };
};

const listUsers = () => db.get().collection('users').find().toArray();

// Joins
const createJoin = async ({ groupid, userid, name }) => {
    const {
        ops: [ databaseResponse ]
    } = await db.get().collection('joins').insertOne({ groupid, userid, name });
    return databaseResponse ?? { message: 'somthing went wrong while joining the group' };
};

const listJoins = () => db.get().collection('joins').find().toArray();