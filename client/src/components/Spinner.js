import React, { useState, useEffect }from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
const Spinner = ({path = "/login"}) => {
    const [Count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Create an interval that increments the count every second (1000 milliseconds)
        const intervalId = setInterval(() => {
            setCount((prevCount) => --prevCount);
        }, 1000);

        Count === 0 && navigate(`${path}`, {
            state: location.pathname
        });

        // Cleanup: Clear the interval when the component unmounts or when the dependencies change
        return () => {
            clearInterval(intervalId);
        };
    },[Count,navigate, location]);
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "70vh" }}>
                <h1 className="text-center">Redirecting to you in {Count} seconds...</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </>
    )
}

export default Spinner