import { toast } from "react-toastify";

const showMessage = async (msg: string) => {
    if (typeof (msg) !== "string") return
    toast(msg)
}

export default showMessage;