import { OrderStatus } from "@/constants/data";
import { apiFetch } from "@/lib/apis";

type CreateOrder = { 
    food_id: string;
    quantity: number;
    address: string;
    notes?: string | null | undefined;
}

export const orderServices = {
  createOrder(data: CreateOrder) {
    return apiFetch("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
   
  getMyOrders() : Record<string,any> {
    return apiFetch("/orders/my");
  },

  getAllOrders() : Record<string,any> {
    return apiFetch("/orders");
  },

  updateStatus(status : OrderStatus,orderId : string) : Record<string,any> {
   return apiFetch(`/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({status}),
    });
  }
};
