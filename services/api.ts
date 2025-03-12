import axios, { AxiosResponse, AxiosError } from "axios";

export interface User {
  id?: number | string;
  username: string;
  password: string;
  fullName?: string;
}

export interface Category {
  id: number | string;
  name: string;
  icon?: string;
}

export interface Product {
  id: number | string;
  name: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  categoryId: number | string;
}

const API_URL = "http://192.168.207.1:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const loginUser = async (
  username: string,
  password: string
): Promise<User> => {
  try {
    const response: AxiosResponse<User[]> = await api.get("/users", {
      params: { username, password },
    });

    const users = response.data;
    if (!Array.isArray(users)) {
      throw new Error("Dữ liệu người dùng không hợp lệ");
    }

    const user = users.find(
      (u: User) => u.username === username && u.password === password
    );
    if (!user) {
      throw new Error("Thông tin đăng nhập không hợp lệ");
    }

    return user;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "API Error (loginUser):",
      axiosError.response?.data || axiosError.message
    );
    throw error;
  }
};

export const signupUser = async (
  userData: { username: string; password: string; fullName?: string }
): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "API Error (signupUser):",
      axiosError.response?.data || axiosError.message
    );
    throw new Error("Đăng ký thất bại");
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await api.get("/users");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "API Error (getUsers):",
      axiosError.response?.data || axiosError.message
    );
    throw new Error("Không thể tải danh sách người dùng");
  }
};

export const getUserById = async (userId: number | string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "API Error (getUserById):",
      axiosError.response?.data || axiosError.message
    );
    throw new Error("Không thể tải thông tin người dùng");
  }
};

export const updateUser = async (
  userId: number | string,
  updatedData: Partial<User>
): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.patch(
      `/users/${userId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "API Error (updateUser):",
      axiosError.response?.data || axiosError.message
    );
    throw new Error("Cập nhật thông tin người dùng thất bại");
  }
};

export const deleteUser = async (userId: number | string): Promise<void> => {
  try {
    await api.delete(`/users/${userId}`);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "API Error (deleteUser):",
      axiosError.response?.data || axiosError.message
    );
    throw new Error("Xóa tài khoản thất bại");
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response: AxiosResponse<Category[]> = await api.get("/categories");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "API Error (getCategories):",
      axiosError.response?.data || axiosError.message
    );
    throw new Error("Không thể tải danh mục");
  }
};

export const getProductsByCategory = async (
  categoryId: number | string
): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await api.get(
      `/products?categoryId=${categoryId.toString()}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "API Error (getProductsByCategory):",
      axiosError.response?.data || axiosError.message
    );
    throw new Error("Không thể tải sản phẩm");
  }
};

export const getProductsByRating = async (
  params: { categoryId?: number | string; minRating?: number } = {}
): Promise<Product[]> => {
  try {
    const query = new URLSearchParams();
    if (params.categoryId) query.append("categoryId", params.categoryId.toString());
    if (params.minRating) query.append("rating_gte", params.minRating.toString());

    const response: AxiosResponse<Product[]> = await api.get(
      `/products?${query.toString()}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "API Error (getProductsByRating):",
      axiosError.response?.data || axiosError.message
    );
    throw new Error("Không thể tải sản phẩm");
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response: AxiosResponse<Product> = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("API Error (getProductById):", axiosError.response?.data || axiosError.message);
    throw new Error("Không thể tải thông tin sản phẩm");
  }
};

export default api;