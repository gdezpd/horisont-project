import React, { useState } from 'react';
import { BurgerMenu } from "../components/burgerMeny/BurgerMeny";
import { AppRouter } from '../router/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './custom.scss'
import s from './app.module.scss'

function App() {

    const [isShown, setIsShown] = useState(false)

    const toggleMobileMenu = () => {
        setIsShown(prev => !prev)
    }

    return (
        <div className='App'>
            <div className={s.header}>
                <BurgerMenu toggleMobileMenu={toggleMobileMenu} isShown={isShown}/>
                <img className={s.img} src='https://horizont-rnd.by/wp-content/uploads/2022/10/logo-horizont-rnd-white.webp' alt='logo'/>
            </div>

            <div className={s.container} onClick={() => setIsShown(false)}>
                <AppRouter/>
            </div>
        </div>
    );
}

export default App;
