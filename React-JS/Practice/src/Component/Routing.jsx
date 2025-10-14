import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Routing() {
    return(
        <>
            <h1>Routing</h1>
            <Link to="/Static">Static</Link>
            <Link to="/Dynamic">Dynamic</Link>
        </>
    )
};

export default Routing;