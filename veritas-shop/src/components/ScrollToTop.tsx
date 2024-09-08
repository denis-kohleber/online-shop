import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const pathName = useLocation();

    // This effect runs whenever the path name changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathName]);

    return null;
}

export { ScrollToTop };
