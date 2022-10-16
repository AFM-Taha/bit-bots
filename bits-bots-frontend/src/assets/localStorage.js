const setToLocalStorage = (id) => {
  const previousItems = localStorage.getItem("cart");
  if (previousItems) {
    const previousCartItem = JSON.parse(previousItems);
    console.log(previousCartItem);
    const newCartItem = [...previousCartItem, id];
    localStorage.setItem("cart", JSON.stringify(newCartItem));
  } else {
    localStorage.setItem("cart", JSON.stringify([id]));
  }
};

const removeFromLocalStorage = (id) => {
  const previousItems = localStorage.getItem("cart");
  if (previousItems) {
    const previousCartItem = JSON.parse(previousItems);
    const rest = previousCartItem.filter((itemId) => itemId !== id);
    localStorage.setItem("cart", JSON.stringify(rest));
  }
};

export { setToLocalStorage, removeFromLocalStorage };
