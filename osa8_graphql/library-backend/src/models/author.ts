import { Schema, model } from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

export interface IAuthor {
  name: string;
  born?: number;
}

const schema = new Schema<IAuthor>({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

schema.plugin(uniqueValidator)

const Author = model<IAuthor>('Author', schema);
export default Author;