import { Link, NavLink } from 'react-router-dom';

import './NavDropdown.css';

function NavDropdown({ label, to, items }) {
    return (
        <div className="nav-dropdown">
            <NavLink to={to}>{label}</NavLink>
            <div className="nav-dropdown__menu">
                {items.map((item) => (
                    <Link key={item.to} to={item.to}>
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default NavDropdown;
