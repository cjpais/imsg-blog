import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../features/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, error } = await supabase.from("posts").select("*");

  const d = data?.map((element: any) => ({
    id: element.id,
    author: element.author,
  }));

  return res.status(200).json(d);
}
