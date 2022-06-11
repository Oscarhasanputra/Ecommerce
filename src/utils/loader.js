import $ from "jquery"

export const Loader={
    
    show:(text=null)=>{
        if(text){
            $("#loaderText").text(text)
        }else{
            $("#loaderText").text("Please Wait...")
        }
        $("#loader").removeClass("d-none")
    },
    hide:()=>{
        $("#loader").addClass("d-none")
    }
}