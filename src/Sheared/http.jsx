export const postApi=(url,payload)=>{
   return  fetch(url,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(payload)
      }).then(res=> res.json()).catch(error=> error)
}