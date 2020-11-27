// Import module
import mongoose from "mongoose";

// Create user schema
const userSchema = new mongoose.Schema({
    oauthid: { type: String, required: true },
    name: { type: String, required: true },
    provider: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String },
    access_token: { type: String, required: true },
    created_at: { type: Number, default: () => Date.now() },
    updated_at: { type: Number, default: () => Date.now() }
});

export const User = mongoose.model("users", userSchema);
