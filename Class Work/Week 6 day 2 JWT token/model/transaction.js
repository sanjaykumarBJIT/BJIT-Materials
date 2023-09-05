const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: {
        type: [
            {
                id: { type: mongoose.Types.ObjectId, ref: 'mangaProducts' },
                quantity: Number,
            },
        ],
        required: true,
    },
  },
//   { timestamps: true }
);

const transactions = mongoose.model("Transaction", transactionSchema);

module.exports = transactions;
