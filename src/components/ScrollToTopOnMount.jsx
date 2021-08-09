import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';

// 這個 component 如果直接放在需要 scroll to position 的元件中的話
// 那個元件在第一次 mount 的時候就會 scroll 會失效
// 也許需要另外加什麼
// 但我發現只要把這個component放在最根源處(但還是要在<Router>中)
// 然後在 useEffect 中做路徑判斷就暫時可以解決了

export function ScrollToTopOnMount() {
    const { height: winY } = useWindowSize()
    const { pathname } = useLocation()
    // console.log(pathname, winY)
    useEffect(() => {

        const path = pathname.split('/')[1]

        if (pathname.slice(0, 9) === '/archive/') {
            window.scrollTo(0, winY - 50);
        }
        if (path === 'home' | path === 'about' | path === 'links' | pathname === '/archive') {
            window.scrollTo(0, 0);
        }

    }, [pathname]);

    return null;
}