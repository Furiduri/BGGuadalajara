import { store } from "../store/store";
import { supabase } from "../supabase";
import { DBTables } from "./Models/Tables";

interface Business{ 
    id: string,
    user_id: string,
    name: string,
    address: string,
    webpage: string,
    description: string,
    picture_url: string,
}
interface BusinessAdd{ 
    user_id: string,
    name: string,
    address: string,
    webpage: string,
    description: string,
    business_lineID: number,
    picture_url: string,
}

const getMyBusiness = async()=>{
        
    let { data: business, error, status } = await supabase
    .from<Business>(DBTables.Business)
    .select('*')
    .eq('user_id', store.user?.id);

    if (error && status !== 406) throw error
    return business;
}

const addBusiness = async(data:BusinessAdd)=>{
    const { error, status } = await supabase
  .from<Business>(DBTables.Business)
  .insert(data)

    if (error && status !== 406) throw error
}

export {getMyBusiness, addBusiness};