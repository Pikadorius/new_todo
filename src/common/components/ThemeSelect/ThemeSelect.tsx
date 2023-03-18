import React from 'react'
import {setTheme} from 'features/theme/themeSlice';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import s from './ThemeSelect.module.scss'
import day from 'assets/icons/day.svg'
import night from 'assets/icons/night.svg'

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
        <>
            <img onClick={handleChange} className={s.theme}
                 src={theme === 'dark' ? night : day}
                 alt={theme === 'dark' ? "Make light" : "Make dark"}
                 title={theme === 'dark' ? "Make light" : "Make dark"}/>
        </>
    )
}

export default Theme