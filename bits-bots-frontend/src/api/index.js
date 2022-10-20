import axios from "axios";

const serverUrl = "https://bits-bots-server.onrender.com/api/v1";
// const serverUrl = 'http://localhost:5000/api/v1'

// get all games api

export const getGamesApi = async () => {
  const { data } = await axios.get(`${serverUrl}/games/all-games`);
  return data;
};

// get cart items

export const getCartItems = async (products) => {
  const cartItems = localStorage.getItem("cart");

  const initialCart = [];

  if (cartItems) {
    const currentcartItem = JSON.parse(cartItems);

    for (let i = 0; i < products.length; i++) {
      const currentItem = products[i];
      for (let j = 0; j < currentcartItem.length; j++) {
        if (currentItem.id == currentcartItem[j]) {
          initialCart.push(currentItem);
        }
      }
    }
  }
  return initialCart;
};

// get single game api
export const getSingleGameApi = async (id) => {
  const { data } = await axios.get(`${serverUrl}/games/single-game?id=${id}`);
  return data;
};

// get all platforms api
export const getAllPlatformsApi = async () => {
  const { data } = await axios.get(`${serverUrl}/platforms/all-platforms`);

  return data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${serverUrl}/user/create-user`, {
    ...userData,
  });
  // if (response.status > 300) return;

  return response;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${serverUrl}/user/create-user`, userData);
  if (response.status > 300) return;

  return response;
};

export const updateUser = async (userData) => {
  const response = await axios.patch(`${serverUrl}/user/update-user`, {
    ...userData,
  });

  return response;
};

// payment

export const makePayment = async (data) => {
  const response = await axios.post(`${serverUrl}/user/payment`, {
    ...data,
  });

  return response;
};

export const getUserApi = async (email) => {
  const response = await axios.get(
    `${serverUrl}/user/single-user?email=${email}`
  );

  return response;
};
