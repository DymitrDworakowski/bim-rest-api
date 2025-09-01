const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxLength: 200 },
    content: { type: String, required: true, minLength: 100 },
    publishDate: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: false },
    slug: { type: String, unique: true, lowercase: true },
    category: {
      type: String,
      default: "General",
      enum: ["General", "Technology"],
    },
    tags: [{ type: String, trim: true }],
    views: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, ""); // 👈 виправив trim
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
