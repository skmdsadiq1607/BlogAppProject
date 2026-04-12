import {Schema,SchemaTypes,model} from 'mongoose'


const commentSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:[true,"user id is required"]
    },
    comment:{
        type:String,
        required:[true,"Enter a comment"]
    }
})
const articleSchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Author id is required"]
    },
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    category:{
        type:String,
        required:[true,"Category is required"]
    },
    content:{
        type:String,
        required:[true,"Content is required"]
    },
    comment:[{ type:commentSchema , default:[]}],
    isArticleActive:{

    },
    isArticleActive:{
        type:Boolean,
        default:true
    }
},{
    versionKey:false,
    timestamps:true,
    strict:"throw"
})

export const ArticleModel = model("article",articleSchema);