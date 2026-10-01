// La tienda cobra sellPrice. El descuento visible debe reflejar esos importes,
// incluso cuando el porcentaje importado de un proveedor no coincide.
export function getDiscountDetails(originalPrice: number, sellPrice: number) {
  if (!Number.isFinite(originalPrice) || !Number.isFinite(sellPrice)
      || originalPrice <= 0 || sellPrice <= 0 || sellPrice >= originalPrice) {
    return null;
  }
  return {
    percentage: Math.max(1, Math.round((1 - sellPrice / originalPrice) * 100)),
    savings: Math.round((originalPrice - sellPrice) * 100) / 100,
  };
}
