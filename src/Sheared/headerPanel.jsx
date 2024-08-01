import {  Link } from "react-router-dom";

const HeaderPanel = () => {
    return (
        <header className="App-header">
            <ul>
                <li>
            <Link to='/'>
              List
              </Link></li>
             
            </ul>
          </header>
    );
}

export default HeaderPanel;
