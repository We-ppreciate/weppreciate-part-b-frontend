// TODO
// This will be the page component to hold all other components specific to the Home page

import { Link } from "react-router-dom";

export default function HomePage() {
    return(
        <div>
        <h1>Homepage Placeholder</h1>
        <p>Let's test these routes...</p>
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
        </div>
    )
}