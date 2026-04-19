export interface Order {
  id: string;
  date: string;
  name: string;
  phone: string;
  notes: string;
  symbols: number[];
  colors: string[];
  type: "custom" | "preorder";
  rugId?: string;
  rugName?: string;
}

const KEY = "mediona_orders";

export function getOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveOrder(order: Omit<Order, "id" | "date">): Order {
  const full: Order = {
    ...order,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  const orders = getOrders();
  orders.unshift(full);
  localStorage.setItem(KEY, JSON.stringify(orders));
  return full;
}

export function deleteOrder(id: string): void {
  const orders = getOrders().filter(o => o.id !== id);
  localStorage.setItem(KEY, JSON.stringify(orders));
}
