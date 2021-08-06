import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import disableScroll from 'disable-scroll';

const ConfirmModal = ({ isVisible, dismiss, confirmAction, title }) => {

    const onDismiss = () => {
        dismiss()
    }

    const onConfirm = () => {
        dismiss()
        confirmAction()
    }

    useEffect(() => {
        if (isVisible) disableScroll.on(); // prevent scrolling
        else disableScroll.off(); // prevent scrolling
    }, [isVisible])

    if (!isVisible) return null
    else return ReactDOM.createPortal(
        <>
            <div className="confirmModal__background" />
            <div className="confirmModal">
                <div className="confirmModal__message">
                    {title}
                </div>
                <div className="confirmModal__buttonBox">
                    <button onClick={onDismiss} className="confirmModal__button">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="confirmModal__button">
                        OK
                    </button>
                </div>
            </div>
        </>
        , document.getElementById('portal'))
}

export default ConfirmModal
