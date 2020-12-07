import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { withRouter } from 'react-router-dom';

var styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        // left: '%',
        top: '5%'
    },
    bmBurgerBars: {
        background: 'white'
    },
    bmBurgerBarsHover: {
        background: '#a90000'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%',
        top: '10%',
        left: '-1%'
    },
    bmMenu: {
        background: 'grey',
        padding: '2.5em 1.5em 0 0',
        fontSize: '1.15em'
    },

    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em',
        background: 'grey'
    },
    bmItem: {
        color: 'white',
        // display: 'inline-block'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
}

class BurgerMenu extends React.Component {
    render() {
        return (
            <Menu styles={styles}>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
            </Menu>
        )
    }
}

export default BurgerMenu;