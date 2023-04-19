import s from './styles.module.css';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import { useRef } from 'react';

export function Modal({children, isOpen, onClose}) {
    const refModal = useRef(null)

    // function handleClickModal() {
    //     refModal.current.classList.remove(s.modal_active)
    //     setTimeout(onClose, 400)
    // }
    // useEffect(() => {
    //     if (isOpen) {
    //         setTimeout(() => { refModal.current.classList.add(s.modal_active) }, 100)
    //     }
    // }, [isOpen])
const renderContent = () => {
    return (
        <div className={cn(s.modal, {[s.modal_active]:isOpen})} onMouseDown={onClose}>
         <div className={cn(s.modal__content, { [s.modal__content_active]: isOpen })} onMouseDown={(e)=>e.stopPropagation()}>
            {children}
            </div>
     </div>);
}
return createPortal(renderContent(), document.getElementById('modal-root'));
}