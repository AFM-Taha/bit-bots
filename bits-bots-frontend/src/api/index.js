import axios from "axios";

const serverUrl = "http://localhost:5000/api/v1";

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

// get perticular platform games

// export const getPlatformGames = async (id, products) => {
//   // const { data } = await axios.get(`${serverUrl}/games/platforms?id=${id}`);
//   const platformID = parseFloat(id);

//   const platformGames = propertyGames(products, platformID, "platforms", 0, 0);

//   const modifiedGameData = platformGames.map((game) => {
//     const data = modifiedData(game);
//     return data;
//   });

//   return modifiedGameData;
// };

// register new user

export const registerUser = async (userData) => {
  const response = await axios.post(`${serverUrl}/user/register-user`, {
    ...userData,
  });
  if (response.status > 300) return;

  return response;
};

// login user

export const createUser = async (userData) => {
  const response = await axios.post(`${serverUrl}/user/create-user`, userData);
  if (response.status > 300) return;

  // localStorage.setItem("accessToken", response?.data?.accessToken);
  // localStorage.setItem("refreshToken", response?.data?.refreshToken);

  return response;
};

// check user

export const checkuser = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    return { success: false, message: "Not user" };
  }

  const response = await axios.post(
    `${serverUrl}/user/check-user`,
    {
      refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.data.user) return { success: false, message: "Not user" };

  return response;
};

// update user

export const updateUser = async (userData) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    return { success: false, message: "Not user" };
  }

  const response = await axios.patch(
    `${serverUrl}/user/update-user`,
    {
      ...userData,
      refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
};

// payment

export const makePayment = async (data) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    return { success: false, message: "Not user" };
  }
  const response = await axios.post(
    `${serverUrl}/user/payment`,
    {
      ...data,
      refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
};
