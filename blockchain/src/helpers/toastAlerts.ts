import { toast } from "react-toastify";

class ToastAlerts{
    toastSuccess(message:string){
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    toastError(message:string){
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    toastInfo(message:string){
        toast.info(message, {
            position: toast.POSITION.TOP_RIGHT,
            
        });
    }
}

export const toastAlerts = new ToastAlerts()