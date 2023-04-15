import { useEffect, useLayoutEffect } from 'react';
import spaceBackground from '../asset/image/space-background.png';

type useBackgroundProps = {
    backgroundStyle?: 'SPACE' | 'GRADIENT' | 'LANDING';
}

export const useBackground = ({ backgroundStyle='SPACE' }:useBackgroundProps) => {
    useLayoutEffect(()=>{
        let navbar = document.getElementById('navbar');
        let app = document.getElementById('app');
        let mobileHeader = document.querySelector('meta[name="theme-color"]');

        if (navbar && app) {
            switch(backgroundStyle) {
                case 'LANDING':
                    mobileHeader?.setAttribute("content", "#1928C3");
                    break;
                case 'SPACE':
                    document.body.style.backgroundImage = `url(${spaceBackground})`;
                    navbar.style.backgroundColor = '#171819';
                    mobileHeader?.setAttribute("content", "#171819");
                    break;
                case 'GRADIENT':
                    app.style.background = 'linear-gradient(rgb(0, 0, 0) 0%, rgba(92, 54, 238, 0) 100%), rgb(86 57 197)';
                    navbar.style.backgroundColor = 'rgb(5 4 13)';
                    mobileHeader?.setAttribute("content", "#090615");
                    break;
                default:
            }
        }

        return () => {
            document.body.style.backgroundImage = '';
            if (navbar) {
                navbar.style.backgroundColor = '';
            }
            if (app) {
                app.style.background = '';
            }
            mobileHeader?.setAttribute("content", "#222222");
        }
    }, [backgroundStyle])
}