'use client';

import Link from "next/link";
import React, { useState } from "react";

import Nav from "./Nav";
import Sci from "./Sci";
import SearchForm from "./SearchForm";

import './header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(false);

  const handleFormOpen = (e: Event | any) => {
    e.preventDefault();
    setOpen(!open);
  }

  const handleToggleMenu = () => {
    setOn(!on);
    const body = document.querySelector('body');
    body?.classList.toggle('mobile-nav-active');
  }

  return (
    <header
      id="header"
      className="header d-flex align-items-center fixed-top"
    >
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <Link href="/" className="logo d-flex align-items-center">
          <h1>DigitalNews</h1>
        </Link>
        <Nav />
        <div className="position-relative">
          <Sci />
          <a className="mx-2 js-search-open" onClick={handleFormOpen}>
            <span className="bi-search"></span>
          </a>

          {
            on ? (
              <i
                className="bi bi-x mobile-nav-toggle"
                onClick={handleToggleMenu}
              ></i>
            ) : (
              <i
                className="bi bi-list mobile-nav-toggle"
                onClick={handleToggleMenu}
              ></i>
            )
          }

          <SearchForm active={open} formOpen={handleFormOpen} />
        </div>
      </div>
    </header>
  );
}
