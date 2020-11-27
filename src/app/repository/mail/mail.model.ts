// Import module
import mongoose from "mongoose";

// Create mail schema
const mailSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    created_at: { type: Date, default: () => Date.now() }
});

export const Mail = mongoose.model("mails", mailSchema);
