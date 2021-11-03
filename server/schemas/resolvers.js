const { User, Thought } = require('../models');

const resolvers = {
    Query: {

        // if no user name provided, get all thoughts. If  user name is provided, get the thoughts for that user
        thoughts: async(parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1});
        },

        thought: async(parent, { _id}) => {
            return Thought.findOne({ _id});
        },

        // get all uers
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },

        user: async(parent, { username }) => {
            return User.findOne({username})
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        }
    }
};

module.exports = resolvers;