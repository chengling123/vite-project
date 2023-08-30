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
