import { Schema, model } from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

interface IBook {
  title: String;
  published: Number;
  author: Schema.Types.ObjectId
  genres: [String]
}

const schema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  published: {
    type: Number,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
})

schema.plugin(uniqueValidator)

const Book = model<IBook>('Book', schema)

export default Book