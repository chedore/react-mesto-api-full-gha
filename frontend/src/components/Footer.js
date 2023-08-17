import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">&#169; {new Date().getFullYear()} Mesto Russia</p>
    </footer>
  );
}
