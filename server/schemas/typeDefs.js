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
    createdBy: User
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
    addForum(title: String!, description: String!, userID: ID!): Forum
    addPost(title: String!, description: String! userID: ID! forumID: ID!): Post
    addComment(text: String!, userID: ID!, postID: ID!): Comment
    addReply(text: String! commentID: ID!): Reply
    updateForum(title: String description: String, forumID: ID!): Forum
 }
`
module.exports = typeDefs;



// addPost(title: String!, description: String!): Post
// login(email: String!, password: String!): Auth
// addReply(text: String! ): Reply


// deleteForum(forumId:ID!):Forum
// deletePost(postId:ID!): Post
// deleteComment(commentID:ID!): Comment
// deleteReply(replyID:ID!): Reply

// updateForum(title: String description: String): Forum
// updatePost(title: String, description: String): Post
// updateComment(text: String): Comment
// updateReply(text: String): Reply