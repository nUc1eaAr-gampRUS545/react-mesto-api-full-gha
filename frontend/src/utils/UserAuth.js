const baseURL='https://api-mesto-react-app.nomoreparties.co';

const checkResponse=(res)=> {
        if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }
export const registr=(data)=>{
return(
    fetch(`${baseURL}/signup`,{
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        credentials:"include",
        body: JSON.stringify(data)
        }).then(checkResponse))

}
export const authorization=(data)=>{
    
    return(
        fetch(`${baseURL}/signin`,{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            credentials:"include",
            body: JSON.stringify(data)
            }).then(checkResponse).then((data) => {
                if (data.token) {
                  const token = data.token;
                  return token;
                };
              }))
    }
export const getContent=()=>{
    return(fetch(`${baseURL}/users/me`,{
        method:"GET",
        headers:{'Content-Type': 'application/json',},
        credentials:"include"
        
        }).then(checkResponse))

}