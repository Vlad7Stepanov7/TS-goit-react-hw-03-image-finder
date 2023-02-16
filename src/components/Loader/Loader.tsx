import { Puff } from 'react-loader-spinner'
import { Spinner } from './Loader.styled';

const Loader = () => {
    return (
        <Spinner>
            <Puff
            color="#07c"
            height="40"
            width="40"
             />
        </Spinner>
    );
}

export default Loader;