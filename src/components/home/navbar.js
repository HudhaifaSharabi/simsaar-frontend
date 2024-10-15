'use client'
import React,{useState,useEffect} from "react";
import Link from "next/link";
import Image from "next/image";

import {FiSearch,FiUser} from '@/assets/icons/vander'

export default function Navbar({navClass,logolight,menuClass}){
    let [scroll, setScroll] = useState(false);
    let [isMenu, setisMenu] = useState(false);
    let [modal, setModal] = useState(false)

    useEffect(() => {
        activateMenu()
        window.addEventListener("scroll", () => {
          setScroll(window.scrollY > 50);
        });
        const closeDropdown =()=>{
            setModal(false)
        }
        document.addEventListener("mousedown", closeDropdown);
        window.scrollTo(0, 0);
      }, []);
        const toggleMenu = () => {
            setisMenu(!isMenu);
            if (document.getElementById("navigation")) {
                const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
                anchorArray.forEach(element => {
                    element.addEventListener('click', (elem) => {
                        const target = elem.target.getAttribute("href")
                        if (target !== "") {
                            if (elem.target.nextElementSibling) {
                                var submenu = elem.target.nextElementSibling.nextElementSibling;
                                submenu.classList.toggle('open');
                            }
                        }
                    })
                });
            }
        };
        function getClosest(elem, selector) {

            // Element.matches() polyfill
            if (!Element.prototype.matches) {
                Element.prototype.matches =
                    Element.prototype.matchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.oMatchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    function (s) {
                        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                            i = matches.length;
                        while (--i >= 0 && matches.item(i) !== this) { }
                        return i > -1;
                    };
            }

            // Get the closest matching element
            for (; elem && elem !== document; elem = elem.parentNode) {
                if (elem.matches(selector)) return elem;
            }
            return null;

        };

        function activateMenu() {
            var menuItems = document.getElementsByClassName("sub-menu-item");
            if (menuItems) {

                var matchingMenuItem = null;
                for (var idx = 0; idx < menuItems.length; idx++) {
                    if (menuItems[idx].href === window.location.href) {
                        matchingMenuItem = menuItems[idx];
                    }
                }

                if (matchingMenuItem) {
                    matchingMenuItem.classList.add('active');
                
                
                    var immediateParent = getClosest(matchingMenuItem, 'li');
            
                    if (immediateParent) {
                        immediateParent.classList.add('active');
                    }
                    
                    var parent = getClosest(immediateParent, '.child-menu-item');
                    if(parent){
                        parent.classList.add('active');
                    }

                    var parent = getClosest(parent || immediateParent , '.parent-menu-item');
                
                    if (parent) {
                        parent.classList.add('active');

                        var parentMenuitem = parent.querySelector('.menu-item');
                        if (parentMenuitem) {
                            parentMenuitem.classList.add('active');
                        }

                        var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
                        if (parentOfParent) {
                            parentOfParent.classList.add('active');
                        }
                    } else {
                        var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
                        if (parentOfParent) {
                            parentOfParent.classList.add('active');
                        }
                    }
                }
            }
        }
    return(
        <>
         <header id="topnav" className={`${scroll ? "nav-sticky" :""} ${navClass}`}>
            <div className="container">
                {logolight === true ? 
                    <Link className="logo" href="/">
                        <span className="logo-light-mode">
                            <Image src='/images/logo.png' width={132} height={32} className="l-dark" alt=""/>
                            <Image src='/images/logo.png' width={132} height={32} className="l-light" alt=""/>
                        </span>
                        <Image src='/images/logo-light.png' width={132} height={32} className="logo-dark-mode" alt=""/>
                    </Link> :
                    <Link className="logo" href="/">
                        <Image src='/images/logo.png' width={132} height={32} className="logo-light-mode" alt=""/>
                        <Image src='/images/logo.png' width={132} height={32} className="logo-dark-mode" alt=""/>
                    </Link>
                }

                <div className="menu-extras">
                    <div className="menu-item">
                        <Link href="#" className={`navbar-toggle ${isMenu ? 'open' : ''}`} id="isToggle" onClick={() => toggleMenu()}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                       
                    </div>
                </div>

                <ul className="buy-button list-inline mb-0">
                    <li className="list-inline-item ps-1 mb-0">
                        <div className="dropdown">
                            <button type="button" className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary" onClick={()=>setModal(!modal)}>
                                <FiSearch className="icons"/>
                            </button>
                            <div className={`${modal === true ? 'show' : ''} dropdown-menu dd-menu dropdown-menu-start bg-white rounded-3 border-0 mt-3 p-0 right-0`} style={{width: "240px", right:"0"}}>
                                <div className="search-bar">
                                    <div id="itemSearch" className="menu-search mb-0">
                                        <form role="search" method="get" id="searchItemform" className="searchform">
                                            <input type="text" className="form-control rounded-3 border" name="s" id="searchItem" placeholder="Search..."/>
                                            <input type="submit" id="searchItemsubmit" value="Search"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="list-inline-item ps-1 mb-0">
                        <Link href="/auth-login" className="btn btn-sm btn-icon btn-pills btn-primary"><FiUser className="icons"/></Link>
                    </li>
                </ul>
        
                <div id="navigation" style={{ display: isMenu ? 'block' : 'none' }}>
                    <ul className={menuClass}>
                        <li><Link href="/" className="sub-menu-item">الرئيسة</Link></li>

                        <li><Link href="/buy" className="sub-menu-item">القائمة</Link></li>
                        
                        <li><Link href="/sell" className="sub-menu-item">الخريطه</Link></li>
        

                        
                        <li><Link href="/contactus" className="sub-menu-item"> تواصل معنا</Link></li>
                    </ul>
                </div>
            </div>
        </header>
        </>
    )
}