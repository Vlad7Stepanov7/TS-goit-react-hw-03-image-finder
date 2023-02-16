import { Gallery } from "./ImageGallery.styled";
import Button from ".././Button";
import Loader from ".././Loader";
import { FC } from "react";
import React from "react";

interface IProps {
    status: string;
    onClickLoadMore: () => void;
    isShowLoadMore: boolean;
    children: React.ReactNode
}

const ImageGallery: FC<IProps> = ({status, onClickLoadMore, children, isShowLoadMore}) => {
 
    return (
        <>
        <Gallery>  
            {children}    
        </Gallery>
          
            {status === "pending" && <Loader />}
            {status === "resolved" && isShowLoadMore && <Button onClick={onClickLoadMore} />}
        </>
    );
}

export default ImageGallery;

      