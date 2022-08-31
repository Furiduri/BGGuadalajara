import { reactive } from "vue"
import {ApiError, User} from "@supabase/supabase-js"


export const store:{user:User | null, Error: ApiError | null} = reactive({
  user: null,
  Error: null
})