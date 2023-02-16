import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled";
import React, { Component } from "react";
import Modal from ".././Modal/Modal";
import { Image } from "../../utils/types";

interface IProps {
    image: Image;
}

interface IState {
    isShowModal: boolean;
}



class ImageGalleryItem extends Component<IProps, IState> {
    state = {
        isShowModal: false
    }

     handleToggleModal = (): void => {
        this.setState(({ isShowModal }) => ({
            isShowModal: !isShowModal
        }));
    }
   
    render() {
    const { image } = this.props;
    const { webformatURL, largeImageURL, tags } = image;
    const { isShowModal } = this.state;
        
   return <>
        <GalleryItem onClick={this.handleToggleModal}>
            <GalleryItemImage src={webformatURL} alt={tags} />
       </GalleryItem>

       {isShowModal && <Modal onClick={this.handleToggleModal}><img src={largeImageURL} alt={tags} /></Modal>}
    </>
};
}

export default ImageGalleryItem; 