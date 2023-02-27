import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE 

export const createPost = async (req,res ) => {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId, 
            firstName: user.firstName,
            lastName: user.lastName,
            locaiton: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            like: {},
            comments: []
        })

        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

// READ 

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}