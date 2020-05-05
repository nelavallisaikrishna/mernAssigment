import axios from "axios";
// import constants from "../../config/constants";
// axios.defaults.baseURL = constants.apiUrl;

export const loginAPI = (email,password) => {
  try{
    const requestUrl = "http://localhost:5000/api/users/login";
    return axios.post(requestUrl, {email,password});
    
  }catch(err){
    throw err;
  }
};

export const registerAPI=(email,name,password,password2)=>{
  const requestUrl = "http://localhost:5000/api/users/register";
  return axios.post(requestUrl, {email,name,password,password2});
}


export const getKeeps=()=>{
  let token=localStorage.getItem("Authorization")
    return axios.get('http://localhost:5000/api/keep',{ headers: {Authorization: token}//the token is a variable which holds the token
  })
}

export const setKeep=(title,description,links, status)=>{
  let token=localStorage.getItem("Authorization")
    return axios.put('http://localhost:5000/api/keep',{title,description,links, status}, { headers: {Authorization: token}});
}


export const updateKeep=(id,status)=>{
  let token=localStorage.getItem("Authorization")
  console.log("-------------------------------------------------------", id, status)
  return axios.post('http://localhost:5000/api/keep',{id, status}, { headers: {Authorization: token}});
}

export const getFeeds=()=>{

}