function encodeQuery(data:any): string{ 
    let query = ""
    for (let d in data) 
         query += encodeURIComponent(d) + '=' 
                  + encodeURIComponent(data[d]) + '&'
    return query.slice(0, -1) 
} 
  
export { encodeQuery };