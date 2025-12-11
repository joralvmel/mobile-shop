import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

interface BreadcrumbItem {
    label: string;
    path: string;
}

function Breadcrumbs() {
    const location = useLocation();

    const getBreadcrumbs = (): BreadcrumbItem[] => {
        const pathnames = location.pathname.split('/').filter((x) => x);

        const breadcrumbs: BreadcrumbItem[] = [
            { label: 'Home', path: '/' }
        ];

        if (pathnames.length === 0) {
            return breadcrumbs;
        }

        if (pathnames[0] === 'product' && pathnames[1]) {
            breadcrumbs. push({
                label: 'Product Details',
                path: `/product/${pathnames[1]}`
            });
        }

        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <nav className="breadcrumbs">
            <div className="container">
                <ul className="breadcrumbs__list">
                    {breadcrumbs.map((crumb, index) => {
                        const isLast = index === breadcrumbs.length - 1;

                        return (
                            <li key={crumb.path} className="breadcrumbs__item">
                                {isLast ? (
                                    <span className="breadcrumbs__current">{crumb.label}</span>
                                ) : (
                                    <>
                                        <Link to={crumb.path} className="breadcrumbs__link">
                                            {crumb. label}
                                        </Link>
                                        <span className="breadcrumbs__separator">/</span>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}

export default Breadcrumbs;
