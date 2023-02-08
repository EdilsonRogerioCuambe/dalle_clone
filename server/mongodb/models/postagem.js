import mongoose from "mongoose";


const Postagem = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
});


const PostagemSchema = mongoose.model('Postagem', Postagem);

export default PostagemSchema;