import Cookies from 'js-cookie';
/** 
 * 
 * 
 */


//登录成功之后，会调用Session.set('token',token)
export const Session={
  set(key:string,val: any){
    if (key === 'token' || key === 'refresh_token') {
			Cookies.set(key, val);
		}
    window.sessionStorage.setItem(key, JSON.stringify(val));
  },
  get(key:string){
    if (key === 'token' || key === 'refresh_token') return Cookies.get(key);
    //类型断言，明确知道变量类型，断言成string类型
    let json=<string>window.sessionStorage.getItem(key);

    return JSON.parse(json)
  },
  remove(){},
  clear(){},
  getToken(){
    return this.get('token')
  },
  getTenant(){}
}


export const local ={
  setKey(key:string){
    // @ts-ignore
    return `${__NEXT_NAME__}:${key}`; 
  },
  //设置永久存储
  set<T>(key:string,value:T){
    console.log(key,value)
    window.localStorage.setItem(local.setKey(key),JSON.stringify(value))
  },
  //获取永久缓存
  get(key:string){
    let json=<string>window.localStorage.getItem(local.setKey(key))
    return JSON.parse(json)
  },

}
