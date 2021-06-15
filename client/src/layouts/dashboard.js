import Sidebar from '../components/sidebar';
import './dashboard.scss';

function Dashboard(props) {
    const classes =`dashboard ${props.className ? props.className : ''}`;

    return (
        <div className={classes}>
            <Sidebar></Sidebar>
            <div className="page">{props.children}</div>
        </div>
    )
}

export default Dashboard;