function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, quantity) {
  if (quantity < 1) throw new RangeError("Количество должно быть больше 0");

  const newCart = [...cart];
  const itemIndex = newCart.findIndex((item) => item.id === product.id);
  const currentQuantity = itemIndex !== -1 ? newCart[itemIndex].quantity : 0;

  if (quantity + currentQuantity > product.stock)
    throw new RangeError("Количество не должно быть больше, чем есть на складе");

  if (itemIndex !== -1) {
    newCart[itemIndex] = {
      ...product,
      quantity: quantity + currentQuantity,
    };
    return newCart;
  }
  newCart.push({ ...product, quantity });

  return newCart;
}

function changeQuantity(cart, id, quantity) {
  if (quantity < 1) throw new RangeError("Количество должно быть больше 0");

  const newCart = [...cart];
  const itemIndex = newCart.findIndex((item) => item.id === id);

  if (itemIndex === -1) return newCart;
  if (quantity > newCart[itemIndex].stock)
    throw new RangeError("Количество не должно быть больше, чем есть на складе");
  else {
    newCart[itemIndex] = { ...newCart[itemIndex], quantity: quantity };
  }

  return newCart;
}
function removeFromCart() {
  return notImplemented();
}
function calculateCartSubtotal() {
  return notImplemented();
}
function calculateOrderTotal() {
  return notImplemented();
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
