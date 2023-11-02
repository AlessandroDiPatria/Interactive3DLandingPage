import React, { useState,useEffect } from "react";
import "./header.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);
  const [defaultAccount,setDefaultAccount] = useState("")
  const [userBalance,setUserBalance] = useState(null)
  const [connectButtonText,setConnectButtonText] = useState(null)



  useEffect(() => {
   
    window.ethereum.on('accountsChanged', async () => {
      initialise();
  });
  
      
   
   
           });

 
async function initialise() {
  setDefaultAccount("")
}
function isMetaMaskInstalled() {
  return Boolean(window.ethereum && window.ethereum.isMetaMask);
}

  async function requestAccount() {
    console.log('Requesting account...');
    if (isMetaMaskInstalled() == false)  {
      alert("Injected Web3 Wallet is installed!");
    }
    

    // ❌ Check if Meta Mask Extension exists 
    if (window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setDefaultAccount(accounts[0]);
        console.log(accounts)
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }




  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a exact to="/" className="nav-logo">
            LandingPage.com
            <i className="fas fa-code"></i>
          </a>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              
            <a
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </a>
             
            </li>
            <li className="nav-item">
              <a
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </a>
            </li>
           
            <li className="nav-item">
              <a
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </a>
            </li>
            <li className="nav-item">
            <button onClick={requestAccount} className="bottone">
            {defaultAccount.length > 0 ? (
                  
                  String(defaultAccount).substring(0, 6) +
                  "..." +
                  String(defaultAccount).substring(38)
                ) : (
                  <span>Connect 🦊</span>
                )}
            </button>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
         <svg viewBox="0 0 100 80" width="40" height="40">
    <rect width="80" height="10"></rect>
    <rect y="30" width="80" height="10"></rect>
    <rect y="60" width="80" height="10"></rect>
</svg>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;