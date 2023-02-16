import { LoadMore } from "./Button.styled";
import { FC } from "react";

interface IProps  {
    onClick: () => void
}

const Button : FC<IProps> = ({onClick}) => {
    return (
        <LoadMore onClick={onClick}>Load more</LoadMore>
    );
}

export default Button;