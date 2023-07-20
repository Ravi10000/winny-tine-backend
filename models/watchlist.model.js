import mongoose from "mongoose";

const WatchlistSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Watchlist = mongoose.model("Watchlist", WatchlistSchema);

export default Watchlist;
