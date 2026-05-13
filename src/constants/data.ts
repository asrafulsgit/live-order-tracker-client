export type FoodCategory =
  | "Pizza"
  | "Burger"
  | "Sushi"
  | "Pasta"
  | "Salad"
  | "Dessert"
  | "Drink"
  | "Asian";

export type Food = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  image_url: string;
  available: boolean;
};

export type OrderStatus =
  | "ordered"
  | "in_progress"
  | "delivery"
  | "completed"
  | "cancelled";

export type Order = {
  id: string;
  user_id: string;
  food_id: string;
  quantity: number;
  total: number;
  status: OrderStatus;
  address: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type NewOrder = Order & {
  food: Food;
};

export const FOODS: Food[] = [
  {
    id: "f-001",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, fresh mozzarella, and basil.",
    price: 12.5,
    category: "Pizza",
    image_url:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800",
    available: true,
  },
  {
    id: "f-002",
    name: "Pepperoni Pizza",
    description: "Loaded with spicy pepperoni and melted mozzarella.",
    price: 14.0,
    category: "Pizza",
    image_url:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    available: true,
  },
  {
    id: "f-003",
    name: "Cheeseburger",
    description: "Juicy beef patty, cheddar, lettuce, tomato, and house sauce.",
    price: 9.75,
    category: "Burger",
    image_url:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    available: true,
  },
  {
    id: "f-004",
    name: "Bacon BBQ Burger",
    description: "Smoky BBQ sauce, crispy bacon, onion rings, and cheddar.",
    price: 11.5,
    category: "Burger",
    image_url:
      "https://images.unsplash.com/photo-1550317138-10000687a72b?w=800",
    available: true,
  },
  {
    id: "f-005",
    name: "Salmon Nigiri (8 pcs)",
    description: "Hand-pressed sushi rice topped with fresh Atlantic salmon.",
    price: 16.0,
    category: "Sushi",
    image_url:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
    available: true,
  },
  {
    id: "f-006",
    name: "Spicy Tuna Roll",
    description: "Tuna, sriracha mayo, cucumber, and sesame.",
    price: 13.0,
    category: "Sushi",
    image_url:
      "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800",
    available: true,
  },
  {
    id: "f-007",
    name: "Spaghetti Carbonara",
    description: "Egg yolk, pancetta, pecorino, and cracked black pepper.",
    price: 13.5,
    category: "Pasta",
    image_url:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
    available: true,
  },
  {
    id: "f-008",
    name: "Penne Arrabbiata",
    description: "Penne tossed in spicy tomato sauce with garlic and chili.",
    price: 11.0,
    category: "Pasta",
    image_url:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
    available: true,
  },
  {
    id: "f-009",
    name: "Caesar Salad",
    description: "Romaine, parmesan, croutons, and creamy Caesar dressing.",
    price: 8.5,
    category: "Salad",
    image_url:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800",
    available: true,
  },
  {
    id: "f-010",
    name: "Greek Salad",
    description: "Cucumber, tomato, olives, feta, and oregano vinaigrette.",
    price: 9.0,
    category: "Salad",
    image_url:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800",
    available: true,
  },
  {
    id: "f-011",
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a molten center and vanilla ice cream.",
    price: 6.5,
    category: "Dessert",
    image_url:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800",
    available: true,
  },
  {
    id: "f-012",
    name: "Pad Thai",
    description: "Stir-fried rice noodles with peanuts, lime, and shrimp.",
    price: 12.0,
    category: "Asian",
    image_url:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800",
    available: true,
  },
  {
    id: "f-013",
    name: "Mango Smoothie",
    description: "Fresh mango blended with yogurt and a hint of lime.",
    price: 4.5,
    category: "Drink",
    image_url:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800",
    available: true,
  },
  {
    id: "f-014",
    name: "Veggie Sushi Platter",
    description: "Avocado, cucumber, and pickled radish rolls. (Out of stock)",
    price: 12.5,
    category: "Sushi",
    image_url:
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800",
    available: false,
  },
];

export const ORDERS: Order[] = [
  // Ordered
  {
    id: "o-001",
    user_id: "u-101",
    food_id: "f-001",
    quantity: 2,
    total: 25.0,
    status: "ordered",
    address: "221B Baker Street, London",
    notes: "Extra basil please.",
    created_at: "2026-05-13T09:15:00.000Z",
    updated_at: "2026-05-13T09:15:00.000Z",
  },
  {
    id: "o-002",
    user_id: "u-102",
    food_id: "f-005",
    quantity: 1,
    total: 16.0,
    status: "ordered",
    address: "742 Evergreen Terrace, Springfield",
    notes: null,
    created_at: "2026-05-13T09:42:00.000Z",
    updated_at: "2026-05-13T09:42:00.000Z",
  },

  // In progress
  {
    id: "o-003",
    user_id: "u-103",
    food_id: "f-003",
    quantity: 3,
    total: 29.25,
    status: "in_progress",
    address: "1600 Amphitheatre Pkwy, Mountain View",
    notes: "No pickles.",
    created_at: "2026-05-13T08:50:00.000Z",
    updated_at: "2026-05-13T09:05:00.000Z",
  },
  {
    id: "o-004",
    user_id: "u-101",
    food_id: "f-007",
    quantity: 1,
    total: 13.5,
    status: "in_progress",
    address: "221B Baker Street, London",
    notes: null,
    created_at: "2026-05-13T08:30:00.000Z",
    updated_at: "2026-05-13T08:55:00.000Z",
  },

  // Out for delivery
  {
    id: "o-005",
    user_id: "u-104",
    food_id: "f-012",
    quantity: 2,
    total: 24.0,
    status: "delivery",
    address: "10 Downing Street, London",
    notes: "Leave at door.",
    created_at: "2026-05-13T08:00:00.000Z",
    updated_at: "2026-05-13T09:10:00.000Z",
  },

  // Completed
  {
    id: "o-006",
    user_id: "u-102",
    food_id: "f-011",
    quantity: 2,
    total: 13.0,
    status: "completed",
    address: "742 Evergreen Terrace, Springfield",
    notes: "Birthday surprise!",
    created_at: "2026-05-12T18:20:00.000Z",
    updated_at: "2026-05-12T19:05:00.000Z",
  },
  {
    id: "o-007",
    user_id: "u-105",
    food_id: "f-004",
    quantity: 1,
    total: 11.5,
    status: "completed",
    address: "350 Fifth Avenue, New York",
    notes: null,
    created_at: "2026-05-11T20:00:00.000Z",
    updated_at: "2026-05-11T20:48:00.000Z",
  },
  {
    id: "o-008",
    user_id: "u-103",
    food_id: "f-009",
    quantity: 1,
    total: 8.5,
    status: "completed",
    address: "1600 Amphitheatre Pkwy, Mountain View",
    notes: "Dressing on the side.",
    created_at: "2026-05-10T12:30:00.000Z",
    updated_at: "2026-05-10T13:10:00.000Z",
  },

  // Cancelled
  {
    id: "o-009",
    user_id: "u-101",
    food_id: "f-002",
    quantity: 1,
    total: 14.0,
    status: "cancelled",
    address: "221B Baker Street, London",
    notes: "Ordered by mistake.",
    created_at: "2026-05-12T11:00:00.000Z",
    updated_at: "2026-05-12T11:04:00.000Z",
  },
  {
    id: "o-010",
    user_id: "u-104",
    food_id: "f-013",
    quantity: 4,
    total: 18.0,
    status: "cancelled",
    address: "10 Downing Street, London",
    notes: "Restaurant closed.",
    created_at: "2026-05-09T16:45:00.000Z",
    updated_at: "2026-05-09T17:00:00.000Z",
  },
];

// Helpers
export const getFoodById = (id: string): Food | undefined =>
  FOODS.find((f) => f.id === id);

export const getOrdersByStatus = (status: OrderStatus): NewOrder[] =>
  ORDERS.reduce<NewOrder[]>((result, order) => {
    if (order.status !== status) return result;

    const food = getFoodById(order.food_id);
    if (!food) return result;

    result.push({
      ...order,
      food,
    });

    return result;
  }, []);

export const STATUS_LABEL: Record<OrderStatus, string> = {
  ordered: "Ordered",
  in_progress: "In Progress",
  delivery: "Out for Delivery",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const PROGRESS_STEPS: OrderStatus[] = [
  "ordered",
  "in_progress",
  "delivery",
  "completed",
];
