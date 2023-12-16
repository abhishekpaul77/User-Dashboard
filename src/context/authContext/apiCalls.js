// import axios from "axios"
// import {loginFailure,loginStart,loginSucess} from "./authAction"

// export const login=async (user,dispatch)=>{
//     dispatch(loginStart());
//     try{
//         const res=await axios.post("auth/login",user)
//         dispatch(loginSucess(res.data));
//     }
//     catch(err){
//         dispatch(loginFailure())
//     }
// }
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./authAction";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};