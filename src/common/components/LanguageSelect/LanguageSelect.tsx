import React, {useEffect, useState} from 'react';
import engFlag from 'assets/icons/lang/eng.png'
import ruFlag from 'assets/icons/lang/ru.png'
import s from './LanguageSelect.module.scss'
import {useTranslation} from "react-i18next";

const LanguageSelect = () => {

    const [lang, setLang] = useState<'en' | 'ru'>('en')
    const {t, i18n} = useTranslation()

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    const langHandler = () => {
        setLang(lang==='en'? 'ru' : 'en')
    }

    useEffect(()=>{
        changeLanguage(lang)
    },[lang])

    return (
            <>
                <img onClick={langHandler} title={t("language") || "Change"} className={s.flag} src={lang === 'en' ? engFlag : ruFlag}
                     alt={lang === 'en' ? "EN" : "RU"}/>
            </>

    );
};

export default LanguageSelect;