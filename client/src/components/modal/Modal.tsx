import { useEffect, useRef, useState } from "react";
import { Transition, CSSTransition } from 'react-transition-group';
import './Modal.scss';

type modalProps = {
    closeModal: Function,
    children: JSX.Element,
    align?: 'CENTER' | 'LEFT' | 'RIGHT' | 'BOTTOM',
}

function Modal({ closeModal, children, align='CENTER' } : modalProps) {
    const modalRef = useRef<any>(null);
    const [show, setShow] = useState(true);

    const closeThisModal = () => {
        setShow(false);
        setTimeout(() => {
            closeModal();
        }, 500);
    }

    const clickModalOutside = (e : any) => {
        if(e.target == modalRef.current) closeThisModal();
    }

    useEffect(()=>{
        document.addEventListener("click", clickModalOutside);
        document.addEventListener("touchend", clickModalOutside);

        return () => {
            document.removeEventListener("click", clickModalOutside); 
            document.removeEventListener("touchend", clickModalOutside);
        }
    }, [modalRef.current])

    return (
        <CSSTransition
            timeout={500}
            in={show}
            nodeRef={modalRef}
        >
            {
                (status)=>(
                    <div 
                        ref={modalRef}
                        className= {`modal modal-${status}`}
                        id={align}
                    >
                        <div style={{display: "contents"}}>
                            { children }
                        </div>
                    </div>
                )
            }

        </CSSTransition>
    )
}
export default Modal;