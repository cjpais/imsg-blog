import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../features/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query);
  if (!req.query.author) {
    return res.status(400).json({ error: "Missing author" });
  }

  // req.query.format = rss, json

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("author", req.query.author)
    .order("created_at", { ascending: false })
    .limit(100);

  return res.status(200).json(data);
}
