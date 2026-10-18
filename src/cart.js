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

function removeFromCart(cart, id) {
  const newCart = [...cart];
  const indexProduct = cart.findIndex((item) => item.id === id);

  if (indexProduct === -1) return newCart;
  newCart.splice(indexProduct, 1);
  return newCart;
}

function calculateCartSubtotal(cart) {
  return cart.reduce((prev, current) => {
    return prev + current.quantity * current.price;
  }, 0);
}

function calculateOrderTotal(cart, promo) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promo === "SAVE10" && subtotal >= 20000 ? subtotal * 0.1 : 0;
  const delivery = subtotal >= 50000 ? 0 : 30000;
  const total = subtotal - discount + delivery;
  return { subtotal, discount, delivery, total };
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
