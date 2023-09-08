const typeDefs = `
type User {
    _id: ID
    username: String
    password: String
    createdAt: String
    forums: [Forum]
    posts: [Post]
    comments: [Comment]
    favoriteForums: [Forum]
}
type Post {
    _id: ID
    title: String
    description: String
    image: String
    createdBy: [User]
    likes: Int
    comments: [Comment]
}
type Forum {
    _id: ID
    title: String
    description: String
    createdBy: [User]
    posts: [Post]
    createdAt: String
}
type Comment {
    _id: ID
    text: String
    createdBy: [User]
    replies: [Reply]
    createdAt: String
    likes: Int
}
type Reply {
    _id: ID
    text: String
    createdBy: [User]
    createdAt: String
    likes: Int
}
type Auth {
    token: ID
    user: User
}
type Query {
    getSingleUser(username: String!): User
    getUsers: [User]
}
 type Mutation {
    addUser(username: String!, password: String!): Auth
 }
`
module.exports = typeDefs;

// getAllUsers: [User]
// getAllForums: [Forum]
// }

// type Mutation {
// }