import React from "react";
import { Link } from "react-router-dom";

function Nav() {

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="e-mail">📧</span>
          <span role="img" aria-label="phone number">📞</span>
          Contacts
        </Link>
      </h1>

      <nav>
      </nav>
    </header>
  );
}

export default Nav;
