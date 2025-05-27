import { atom, selector, selectorFamily } from "recoil";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const getAuthHeader = () => ({
  headers: {
      token: localStorage.getItem('token') || ''
  }
});
const sellerOwnProductListDefaultSelector = selector<any[]>({
    key: "sellerOwnProductListDefaultSelector",
    get: async ({ get }) => {
    
        get(refetchState);
          
        try {
            const res = await fetch(`${BACKEND_URL}/seller/product`,  getAuthHeader());
      
            if (!res.ok) {
              throw new Error('Failed to fetch orders');
            }
            const data = await res.json();
            return data.owenProduct || [];
          } catch (err) {
            throw err;
          }
    },
});


export const refetchState = atom<boolean>({
  key: 'refetchState',
  default: false
})

export const sellerOwnProductListState = atom<any[]>({
    key: 'sellerOwnProductListState',
    default: sellerOwnProductListDefaultSelector,
});

export const sellerOwnProductIdListSelector = selector<number[]>({
    key: 'sellerOwnProductIdListSelector',
    get: ({ get }) => {
        const products = get(sellerOwnProductListState);
        return products.map((product: any) => product._id);
    },
});

export const sellerOwnProductSelectorFamily = selectorFamily<any | null, string>({
    key: 'sellerOwnProductSelectorFamily',
    get:
      (productId: string) =>
      ({ get }) => {
        const products = get(sellerOwnProductListState);
        return products.find((product: any) => product._id == productId) || null;
      },
  });
  