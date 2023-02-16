import { Overlay, ModalImage } from "./Modal.styled"
import { createPortal } from "react-dom";
import React, { Component } from "react";

const modalRoot = document.querySelector(`#modal-root`)!;

interface IProps {
    onClick: () => void;
    children: React.ReactNode;
}

class Modal extends Component<IProps> {
    componentDidMount() {
        window.addEventListener(`keydown`, this.handleKeyDown)
    }

    componentWillUnmount() {
      window.removeEventListener(`keydown`, this.handleKeyDown)
    }

    handleKeyDown = (e: KeyboardEvent): void  => {
        if (e.code === `Escape`) {
           this.props.onClick();
        }
    }

    handleCloseBackdrop = (e: React.MouseEvent): void => {
        if (e.currentTarget === e.target) {
            this.props.onClick();
        }
    }

    render() {
        const { children } = this.props;

    return createPortal(
        <Overlay onClick={this.handleCloseBackdrop}>
            <ModalImage>
                {children}
            </ModalImage>
        </Overlay>,
     modalRoot); 
}
}

export default Modal;