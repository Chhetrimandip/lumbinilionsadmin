import { create } from "zustand";
import { persist } from "zustand/middleware"

interface cartitem {
    id: string;
    price: number;
    quantity: number;
    name: string;
    image: string;
}

interface cartstore {
    cart: cartitem[];
    addtocart: (item: Omit<cartitem, "quantity">) => void;
    removefromcart: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    clearcart: () => void;
    totalitem: () => number;
    totalprice: () => number;
}

export const useCartStore = create<cartstore>()(
    persist(
        (set, get) => ({
            cart: [],
            addtocart: (item: Omit<cartitem, "quantity">) => {
                set((state) => {
                    const existingItem = state.cart.find((i) => item.id === i.id);
                    if (existingItem) {
                        return {
                            cart: state.cart.map((i) => 
                                i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                            )
                        };
                    } 
                    return {
                        cart: [...state.cart, {...item, quantity: 1}]
                    };
                });
            },
            decreaseQuantity: (id: string) => {
                set((state) => {
                    const existingItem = state.cart.find((i) => id === i.id);
                    if (existingItem && existingItem.quantity > 1) {
                        return {
                            cart: state.cart.map((i) => 
                                i.id === id ? {...i, quantity: i.quantity - 1} : i
                            )
                        };
                    }
                    return {
                        cart: state.cart.filter((i) => i.id !== id)
                    };
                });
            },
            removefromcart: (id: string) => {
                set((state) => ({
                    cart: state.cart.filter((i) => i.id !== id)
                }));
            },
            clearcart: () => set({ cart: [] }),
            totalitem: () => {
                // Return 0 if cart is empty
                const cart = get().cart;
                return cart.length > 0 ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
            },
            totalprice: () => {
                // Return 0 if cart is empty
                const cart = get().cart;
                return cart.length > 0 ? cart.reduce((sum, item) => sum + (item.quantity * item.price), 0) : 0;
            },
        }),
        {
            name: "cart-storage"
        }
    )
);