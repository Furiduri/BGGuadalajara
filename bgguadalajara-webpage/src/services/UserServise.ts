import { store } from "../store/store";
import { supabase } from "../supabase";
import Profile from './Models/Profile';
import Rol from "./Models/Rol";


const getUserInfo = async (id: string | null = null) => {

  let { data, error, status } = await supabase
    .from<Profile>('profiles')
    .select('*, Roles(RolName)')
    .eq("id", id != null ? id : store.user?.id)
    .single()

  if (error && status !== 406) throw error
console.log(data);
  return data;
}
export { getUserInfo };