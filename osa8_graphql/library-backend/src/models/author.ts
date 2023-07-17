import { Mongoose, Schema, model } from "mongoose"
// @ts-ignore
import uniqueValidator from "mongoose-unique-validator"

export interface IAuthor {
  name: string;
  born?: number;
  books: [Schema.Types.ObjectId?];
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
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
})

schema.plugin(uniqueValidator)

const Author = model<IAuthor>('Author', schema);
export default Author;