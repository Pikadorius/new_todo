import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
//     .use(XHR)
//     .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // fallbackLng: 'en',
        // debug: true,
        // interpolation: {
        //     escapeValue: false,
        // },
        // load: 'languageOnly',
        // backend: {
        //     loadPath: '/public/locales/{{lng}}/{{ns}}.json'
        // }
        /*interpolation: {
            escapeValue: false,
        },*/
        lng: 'en',
        resources: {
            en: {
                translation: {
                    "logout":"Logout",
                    "todolist_app": "Todolist app",
                    "todolists": "Todolists"
                }
            },
            ru: {
                translation: {
                    "logout":"Выйти",
                    "todolist_app": "Следи за делами",
                    "todolists": "Список дел"
                }
            }
        }
    });

export default i18n;