import axios from "axios"
import SweetAlert from "sweetalert2"
import {Loader} from "./loader"
class Save{
    static get(url,data={}){
        return new Promise((resolve,reject)=>{
            axios.get(url,{params:data}).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err)
            })
        })
    }
    static post(url,data={}){
        return new Promise((resolve,reject)=>{
            Loader.show()
            axios.post(url,data).then(res=>{
                const data=res.data;
                Loader.hide()
                if(data && data.message){
                    
                    SweetAlert.fire({
                        icon:"success",
                        title:"Success",
                        text:`${data.message}`,
                        timer:1000
                    }).then(()=>{
                        
                        resolve(data)
                    }).catch(err=>{

                    })
                }
                else
                    resolve(data)
            }).catch(err=>{
                
                console.log("hiding")
                Loader.hide()
                if(err.response && err.response.data && err.response.data.message){
                    SweetAlert.fire({
                        icon:"error",
                        title:"Failed",
                        text:`${err.response.data.message}`,
                        timer:1000
                    }).then(()=>{

                console.log("hiding")
                        reject(err)
                    })
                }else
                    reject(err)
            })
        })
    }
    static put(url,id,data={}){
        return new Promise((resolve,reject)=>{
            Loader.show()
            axios.put(`${url}/${id}`,data).then(res=>{
                const data=res.data
                Loader.hide()
                if(data && data.message){
                    SweetAlert.fire({
                        icon:"success",
                        title:"Success",
                        text:`${data.message}`,
                        timer:1000
                    }).then(()=>{
                        resolve(data)
                    }).catch(err=>{

                    })
                }else
                    resolve(data)
            }).catch(err=>{
                Loader.hide()
                if(err.response && err.response.data && err.response.data.message){
                    SweetAlert.fire({
                        icon:"error",
                        title:"Failed",
                        text:`${err.response.data.message}`,
                        timer:1000
                    }).then(()=>{
                        reject(err)
                    })
                }else
                    reject(err)
                
            })
        })
    }
    static delete(url,data={}){
        return new Promise((resolve,reject)=>{
            Loader.show()
            axios.delete(`${url}`,data).then(res=>{
                const data=res.data;
                Loader.hide()
                if(data.message){
                    SweetAlert.fire({
                        icon:"success",
                        title:"Success",
                        text:`${data.message}`,
                        timer:1000
                    }).then(()=>{
                        resolve(data)
                    }).catch(err=>{

                    })
                }else
                    resolve(data)
            }).catch(err=>{
                Loader.hide()
                if(err.response && err.response.data && err.response.data.message){
                        SweetAlert.fire({
                            icon:"error",
                            title:"Failed",
                            text:`${err.response.data.message}`,
                            timer:1000
                        }).then(()=>{
                            reject(err)
                        }).catch(()=>{

                        })
                }else
                    reject(err)
            })
        })
        
    }
}

export default Save;