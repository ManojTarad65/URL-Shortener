
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
