import Jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export const getDataFromToken = () => {
  try {
    const token = Cookies.get("accessToken")
    const decodedToken: any = Jwt.decode(token);

    return decodedToken


  } catch (error: any) {
    throw new Error(error.message)
  }
}