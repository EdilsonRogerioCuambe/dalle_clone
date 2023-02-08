import mongoose from "mongoose";


const Postagem = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
});


const PostagemSchema = mongoose.model('Postagem', Postagem);

export default PostagemSchema;