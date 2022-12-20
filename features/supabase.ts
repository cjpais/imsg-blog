import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  "https://fzuptiqapwizenjjpwca.supabase.co",
  // SECRET KEY
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dXB0aXFhcHdpemVuampwd2NhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MTAwMzgzMSwiZXhwIjoxOTg2NTc5ODMxfQ.KOguLN8awgi23zXPmSUyKTGs7_y2RKUr6Cbt9f_eqjU"
);
