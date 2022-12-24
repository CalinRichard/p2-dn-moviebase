import History from "models/History";
import dbConnect from "utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  const results = await History.find();

  res.status(200).json(results);
}
