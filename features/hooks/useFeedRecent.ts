import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const useFeedRecent = (authorId: string) => {
  const [feed, setFeed] = useState<null | any>(null);
  useEffect(() => {
    const fetchFeed = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("author", authorId)
        .order("created_at", { ascending: false })
        .limit(100);
      console.log({ data });
      console.log({ error });

      setFeed(data);
    };

    if (authorId) fetchFeed();
  }, [authorId]);

  return { feed };
};

export default useFeedRecent;
