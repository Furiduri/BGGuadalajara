import { store } from "../store/store";
import { supabase } from "../supabase";

interface profile{
  id: string,
  username: string | null,
  avatar_url: string | null,
  Description: string | null,
  BGGUserName: string | null,
  FristName: string | null,
  LastName: string | null,
  SecondLastName: string | null,
}

const getUserInfo = async(id:string|null = null)=>{        
    
let { data, error,status } = await supabase
.from<profile>('profiles')
.select('*')
.eq("id", id != null ? id : store.user?.id)
.single()

  if (error && status !== 406) throw error

  return data;
}

export {getUserInfo};