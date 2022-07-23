import $ from "jquery"
import Swal from "sweetalert2"
export const validate=(classname=null)=>{

    const classString = classname? classname : ".required";
    const elements=$(classString)
    // const test= new boo
    
    for( let i=0; i<elements.length; i++){
        
        const elem=elements[i]
        const value= elem.value
        //console.log("validating")
        //console.log(elem)
        if(value =="" || value == null){
            Swal.fire({
                title:"Your "+elem.title +" Still Empty",
                icon:"error",
                timer:500
            })
            return false;
        }
    }
    return true;
}