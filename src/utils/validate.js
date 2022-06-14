
export function validUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
export function removeNullKey(obj){
  let newObj={};
  let keys = Object.keys(obj)
  if(keys&&keys.length>0){
      keys.forEach(k =>{
        if(typeof obj[k]  == 'object'){
            if(obj[k] && obj[k].length>0){
              newObj[k] = obj[k]
            }
        }else if(typeof obj[k] == 'string'){
          if(obj[k] && obj[k] !='' &&obj[k].length>0){
            newObj[k] = obj[k]
          }
        }else if(typeof obj[k] == 'boolean'){
          newObj[k] = obj[k]
        }else if(typeof obj[k] == 'number'){
          newObj[k] = obj[k]
        }else{
          if(typeof obj[k] != 'undefined'){
            newObj[k] = obj[k]
          }
        }
      })
  }
  return newObj;
}

export function price(price){
  if(price){
    return (price/1000).toFixed(3);
  }else{
    return 0.000;
  }
}
