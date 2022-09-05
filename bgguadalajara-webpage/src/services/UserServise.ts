import { store } from "../store/store";
import { supabase } from "../supabase";



const getUserInfo = async()=>{    
    
    let { data, error, status } = await supabase
    .from("profiles")
    .select(`username, website, avatar_url`)
    .eq("id", store.user.id)
    .single()

  if (error && status !== 406) throw error

  return data;
}

export {getUserInfo};