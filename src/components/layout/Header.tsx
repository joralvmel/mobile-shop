import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <Link to="/" className="header__logo">
                        <h1>📱 Mobile Shop</h1>
                    </Link>

                    <div className="header__cart">
                        Cart:  <span className="header__cart-count">0</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
