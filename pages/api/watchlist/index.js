import Watchlist from "models/Watchlist";
import dbConnect from "utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const results = await Watchlist.find();

  res.status(200).json(results);
}
