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
    business_lineID: number,
    business_line: string,
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
    .select('*, business_line:'+DBTables.cat_busines_lines+'(business_line)')
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


const chgBusiness = async(data:Business)=>{
    const { data: business,error, status } = await supabase
  .from<Business>(DBTables.Business)
  .update(data)
  .eq('id', data.id)
  .select()
  .single();

    if (error && status !== 406) throw error
    return business;
}

export { getMyBusiness, addBusiness, chgBusiness };
export type { Business };
