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
    createdAt: String
    likes: Int
    comments: [Comment]
}
type Forum {
    _id: ID
    title: String
    description: String
    createdBy: User
    posts: [Post]
    createdAt: String
}
type Comment {
    _id: ID
    text: String
    createdBy: User
    replies: [Reply]
    createdAt: String
    likes: Int
}
type Reply {
    _id: ID
    text: String
    createdBy: User
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
    getForums: [Forum]
    getPostsByForum(forumId: ID!): [Forum]
    getCommentsByPost(postId: ID!): [Post]
    getSinglePost(postId: ID!): Post
    getSingleForum(forumId: ID!): Forum
    getRepliesByComment(commentId: ID!):[Comment]
    searchForums(searchTerm: String!): [Forum]
    searchPosts(forumId: ID!, searchTerm: String!): [Post]
}
 type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addForum(title: String!, description: String!, userID: ID!): Forum
    addPost(title: String!, description: String!, image: String, userID: ID!, forumId: ID!): Post
    addComment(text: String!, userID: ID!, postId: ID!): Comment
    likeComment(commentId: ID!): Comment
    likeReply(replyId: ID!): Reply
    addReply(text: String! userID: ID! commentId: ID!): Reply
    updateForum(title: String, description: String, forumId: ID!): Forum
    updatePost(title: String, description: String, image: String, postId: ID!): Post
    updateComment(text: String, commentId: ID!): Comment
    updateReply(text: String, replyID: ID!, commentId: ID!): Reply
    deleteForum(forumId: ID!): Forum
    deletePost(postId: ID!): Post
    deleteComment(commentId: ID!): Comment
    deleteReply( replyId: ID!, commentId: ID!): Reply
 }
`
module.exports = typeDefs;