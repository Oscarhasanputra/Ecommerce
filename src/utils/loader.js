import $ from "jquery"

export const Loader={
    
    show:()=>{
        $("#loader").removeClass("d-none")
    },
    hide:()=>{
        $("#loader").addClass("d-none")
    }
}