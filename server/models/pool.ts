// import * as mongoose from 'mongoose';

// const catSchema = new mongoose.Schema({
//   name: String,
//   weight: Number,
//   age: Number
// });

// const Cat = mongoose.model('Cat', catSchema);

// export default Cat;
import * as mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  user: String,
  redMarbles: Number,
  greenMarbles: Number
});

const poolSchema = new mongoose.Schema({
  code: String,
  date: String,
  totalPeople: Number,
  marbles: Number,
  results: [resultSchema]
});

const Pool = mongoose.model("Pool", poolSchema);
export default Pool;
