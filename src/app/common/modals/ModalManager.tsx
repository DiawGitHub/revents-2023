import LoginForm from "../../../features/auth/LoginForm";
import RegisterForm from "../../../features/auth/RegisterForm";
import TestModal from "../../../features/scratch/TestModal"
import { useAppSelector } from "../../store/store"


export default function ModalManager() {
    const modalLookup = {
        TestModal, 
        LoginForm,
        RegisterForm
    }

    const {type, data, open} = useAppSelector(state => state.modals);

    let renderedModal;

    if (open && type) {
        const ModalCompont = (modalLookup as any)[type];
        renderedModal = <ModalCompont data={data} />
    }

  return (
    <span>{renderedModal}</span>
  )
}