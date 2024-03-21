import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

const PagesMenu = require('./PagesMenu');
const PagesProjeto1 = require('./PagesProjetoUm');
const PagesProjeto2 = require('./PagesProjetoDois');

const Menu = () => {
  const [currentPage, setCurrentPage] = useState(PagesMenu.HOME.key);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubMenuOpen = (page) => {
    setOpenSubMenu(page);
  };

  const handleSubMenuClose = () => {
    setOpenSubMenu(null);
  };

  return (
    <nav className="menu">
      <ul>
        {Object.values(PagesMenu).map((page) => (
          <li
            key={page.key}
            className={currentPage === page.key ? 'active' : ''}
            onMouseEnter={() => handleSubMenuOpen(page.key)}
            onMouseLeave={handleSubMenuClose}
          >
            <Link
              to={`/${page.key}`}
              onClick={() => handlePageChange(page.key)}
            >
              {page.title}
            </Link>
            {page.key === PagesMenu.PROJETO1.key && openSubMenu === page.key && (
              <ul className="submenu">
                {Object.values(PagesProjeto1).map((subPage) => (
                  <li key={subPage.key}>
                    <Link to={`/${subPage.key}`}>
                      {subPage.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {page.key === PagesMenu.PROJETO1.key && openSubMenu === page.key && (
              <ul className="submenu">
                {Object.values(PagesProjeto1).map((subPage) => (
                  <li key={subPage.key}>
                    <Link to={`/${subPage.key}`}>
                      {subPage.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {/* {page.key === PagesMenu.PROJETO2.key && openSubMenu === page.key && (
              <ul className="submenu">
                {Object.values(PagesProjeto2).map((subPage) => (
                  <li key={subPage.key}>
                    <Link to={`/${subPage.key}`}>
                      {subPage.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )} */}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
