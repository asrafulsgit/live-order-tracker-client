import { apiFetch } from "@/lib/apis";

 
export const foodServices = {
  getFoods() : Record<string,any> {
    return apiFetch("/foods");
  },

  getFood(id: string) : Record<string,any> {
    return apiFetch(`/foods/${id}`);
  },
   
 
};
