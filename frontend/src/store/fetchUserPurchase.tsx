import { atom, selector, selectorFamily } from "recoil";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const getAuthHeader = () => ({
  headers: {
      token: localStorage.getItem('token') || ''
  }
});

const userPurchaseListDefaultSelector = selector<any[]>({
    key: 'userPurchaseListDefaultSelector/Default',
    get: async ({ get }) => {
    
        get(refetchState);
          
        try {
            const res = await fetch(`${BACKEND_URL}/user/product`,  getAuthHeader());
      
            if (!res.ok) {
              throw new Error('Failed to fetch orders');
            }
      
            const data = await res.json();
            return data.productAll || [];
        } catch (err) {
          throw err;
        }
    },
});


export const refetchState = atom<boolean>({
  key: 'refetchState',
  default: false
})

export const userPurchaseListState = atom<any[]>({
    key: 'userPurchaseListState',
    default: userPurchaseListDefaultSelector,
});

export const userPurchaseIdListSelector = selector<number[]>({
    key: 'userPurchaseIdListSelector',
    get: ({ get }) => {
        const orders = get(userPurchaseListState);
        return orders.map((order: any) => order._id);
    },
});

export const userPurchaseSelectorFamily = selectorFamily<any | null, string>({
    key: 'userPurchaseSelectorFamily',
    get:
      (orderId: string) =>
      ({ get }) => {
        const orders = get(userPurchaseListState);
        return orders.find((order: any) => order._id == orderId) || null;
      },
  });
  