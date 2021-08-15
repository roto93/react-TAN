import { useState, useEffect } from 'react'

const useScroll = () => {
    const [isScrollDown, setIsScrollDown] = useState(false);

    useEffect(() => {

        let prevY = 0
        const onWindowScroll = () => {
            const currentY = window.pageYOffset
            if (currentY - prevY > 0) {
                setIsScrollDown(true)
            } else {
                setIsScrollDown(false)
            }
            prevY = currentY


        }

        window.addEventListener('scroll', onWindowScroll)

        return () => {
            window.removeEventListener('scroll', onWindowScroll)
        }

    }, [])

    return [isScrollDown, setIsScrollDown]
}

export default useScroll
