
import { RingLoader } from 'react-spinners';
const LoadingSpinner = ({smallHeight}) => {
    return (
        <div className={`${smallHeight ? 'h-[250px]': 'h-[70vh]'}`}>
            <RingLoader size={100} color="#026ba6" />
        </div>
    );
};

export default LoadingSpinner;