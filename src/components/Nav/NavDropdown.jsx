import { Link, NavLink } from 'react-router-dom';

import './NavDropdown.css';

function pillLinkClassName({ isActive }) {
    return `pillnav__link ${isActive ? 'is-active' : ''}`;
}

function NavDropdown({ label, to, items }) {
    function handleLinkClick(e) {
        // Blurs the clicked link so :focus-within stops holding the menu open
        // after an SPA navigation, where nothing else removes focus from it.
        e.currentTarget.blur();
    }

    return (
        <div className="nav-dropdown">
            <NavLink to={to} className={pillLinkClassName} onClick={handleLinkClick}>
                {label}
            </NavLink>
            <div className="nav-dropdown__menu">
                {items.map((item) => (
                    <Link key={item.to} to={item.to} onClick={handleLinkClick}>
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default NavDropdown;
