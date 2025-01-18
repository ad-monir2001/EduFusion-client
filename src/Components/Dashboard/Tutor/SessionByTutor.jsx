import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const SessionByTutor = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    
    return (
        <div>
            <h1>Session by Tutors</h1>
            <p>Where Every Session Inspires Brilliance.</p>
            
        </div>
    );
};

export default SessionByTutor;