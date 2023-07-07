import { Schema, model } from "mongoose";
// @ts-ignore
import uniqueValidator from "mongoose-unique-validator";

const schema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    favoriteGenre: {
        type: String,
        required: true,
    }
});

schema.plugin(uniqueValidator);

const User = model('User', schema);
export default User;