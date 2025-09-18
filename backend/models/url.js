// import mongoose from "mongoose";

// const UrlSchema = new mongoose.Schema({
//     shortId: {type:String, required:true},
//     orignalUrl:{type:String, required:true},
//   createdAt:{type:Date, default:Date.now},
//     // createdAt and updatedAt will be added automatically
// },{timestamps:true});
// const Url = mongoose.model("Url", UrlSchema);
// export default Url;

// import mongoose from "mongoose";

// const urlSchema = new mongoose.Schema({
//   originalUrl: {
//     type: String,
//     required: true,
//   },
//   nanoId: {
//     // 👈 change this from shortId → nanoId
//     type: String,
//     required: true,
//     unique: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model("Url", urlSchema);


// import mongoose from "mongoose";

// const urlSchema = new mongoose.Schema({
//   originalUrl: {
//     type: String,
//     required: true,
//   },
//   nanoId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model("Url", urlSchema);

import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    // This field is the key
    type: String,
    required: true, // It needs to be required
    unique: true, // It needs to be unique
  },
});

const Url = mongoose.model("Url", urlSchema);

export default Url;
