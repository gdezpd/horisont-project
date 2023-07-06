import React from "react"
import { NavLink } from "react-router-dom"
import s from './Burger.module.scss'

type BurgerMenuType = {
    toggleMobileMenu: () => void
    isShown: boolean
}
export const BurgerMenu = ({ toggleMobileMenu, isShown }: BurgerMenuType) => {

    return (
        <>
            <label className={s.menuBtn} onClick={toggleMobileMenu}>
                <span/>
            </label>
            <div className={` ${s.menuBox} ${isShown ? s.menuBoxOpen : ''}`}>

                <div className={s.myPhoto}/>
                <h3 className={s.email}>
                    chobanyuk.pavell@gmail.com
                </h3>

                <ul className={s.links}>
                    <li style={{ listStyleType: 'none' }}>
                        <NavLink className={s.menuItem} to='/about'
                                 onClick={toggleMobileMenu}>About
                            project</NavLink></li>
                    <li style={{ listStyleType: 'none' }}><NavLink className={s.menuItem} to='/'
                                                                 onClick={toggleMobileMenu}>Home
                        page</NavLink></li>
                </ul>
            </div>

        </>
    )
}
