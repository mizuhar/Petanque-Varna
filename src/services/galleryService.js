import { supabase } from "../lib/supabaseClient";

export async function uploadImage(file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('gallery')
    .upload(fileName, file);

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from('gallery')
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
}
