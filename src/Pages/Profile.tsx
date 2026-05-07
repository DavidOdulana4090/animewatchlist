import ComingSoon from "../components/ComingSoon";
import { useAuth } from "../utils/AuthContext";

function Profile() {
    const { userData } = useAuth();

    
    return (
        <>
            <ComingSoon/>
    </>  );
}

export default Profile;