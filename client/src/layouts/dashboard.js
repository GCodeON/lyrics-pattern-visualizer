import { Outlet } from "react-router-dom";

import Sidebar from '../components/sidebar/sidebar';
import './dashboard.scss';

function Dashboard(props) {
    const classes =`dashboard ${props.className ? props.className : ''}`;

    return (
        <div className={classes}>
            <Sidebar></Sidebar>
            <Outlet />
            {/* <div className="page">{props.children}</div> */}
        </div>
    )
}

export default Dashboard;