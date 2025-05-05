import {create} from "zustand"
import {persist} from "zustand/middleware"

interface cartitem{
    id: string,
    price: number,
    quantity: number,
    image:string,
    name: string,
}
interface cartstore{
    cart: cartitem[],
    addTocart:(item : Omit<cartitem,"quantiy">) => void,
    decreaseQuantity:(id:string) => void,
    removeFromCart: (id: string) => void,
    clearCart : () => void,
}

export const  useCartStore = create<cartstore>()(
    persist(
        (set,get) => ({
            cart: [],
            addTocart : (item: Omit<cartitem,"quantity">) =>{
                set((state) => {
                    const existingItem = state.cart.find((i) => i.id === item.id),
                    if(existingItem) {
                         return {cart: state.cart.map((i)=> 
                            i.id === item.id? {...i,quantity: i.quantity+1}:i),
                         }} 
                        return {
                            cart: [...state.cart,{...item,quantity:1}]
                        }
                        })},

                decreaseQuantity : (id:string) => {
                    set((state) => {
                        const existingItem = state.cart.find((i) => i.id === id)
                        if (existingItem){
                            return{ cart:  state.cart.map((i) =>
                                 i.id === id?{...i, quantity:i.quantity-1}:i 
                            )}
                        }
                        return{ cart:  state.cart.filter((i) => i.id != id)}
                    })
                } ,
                clearCart: () =>{
                    set( {cart: []} )
                },
                removeFromCart : (id:string)=>{
                    set((state)=> {
                        
                    })

                }

                }),
                {
                    name:"cart-storage"
                }
    )

)