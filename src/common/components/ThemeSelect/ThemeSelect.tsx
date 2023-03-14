import React from 'react'
import {setTheme} from 'features/theme/themeSlice';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';

const Theme = () => {
    const theme = useAppSelector((state) => state.theme)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    const handleChange = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        dispatch(setTheme(next))
    }

    return (
        <div onClick={handleChange} style={{cursor: "pointer"}}>{theme === 'dark' ? 'dark' : 'light'}</div>
    )
}

export default Theme