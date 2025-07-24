"use client";

import axios from "axios";

const httpApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

httpApi.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { httpApi };
