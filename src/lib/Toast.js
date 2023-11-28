import 'vue-toast-notification/dist/theme-sugar.css';
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const optionsToast = {
    position:"top-right"
}
const toastSuccess = (message) => {
    toast.success(message, optionsToast)
}

const toastError = (message) => {
    toast.error(message, optionsToast)
}

export {toastSuccess,toastError}