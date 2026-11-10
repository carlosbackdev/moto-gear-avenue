// Public seller details. Complete the deployment checklist before publishing.
export const seller = {
  name: 'Carlos Arroyo García',
  brand: 'MotoGear',
  email: 'motogearspain@gmail.com',
  taxId: import.meta.env.VITE_SELLER_TAX_ID?.trim() || '',
  address: import.meta.env.VITE_SELLER_ADDRESS?.trim() || '',
  returnsAddress: import.meta.env.VITE_RETURNS_ADDRESS?.trim() || '',
};
