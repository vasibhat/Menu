import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;
