import Cookies from "js-cookie";

export const saveToken = (token) => Cookies.set("token", token, { expires: 1 })
