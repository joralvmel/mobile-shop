import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.scss';

function Header() {
    const { cartCount } = useCart();

    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <Link to="/" className="header__logo">
                        <h1>📱 Mobile Shop</h1>
                    </Link>

                    <div className="header__cart">
                        Cart:  <span className="header__cart-count">{cartCount}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
