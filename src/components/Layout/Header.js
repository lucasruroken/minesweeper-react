import React from 'react';
import {Link} from "react-router-dom";
import {useRecoilState} from "recoil";
import {boardsAtom} from "../../recoil/atoms/boardsAtom";
import {userAtom} from "../../recoil/atoms/userAtom";
import { useHistory } from 'react-router-dom'

export const Header = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [boards, setBoards] = useRecoilState(boardsAtom);
  const history = useHistory();

  const onLogout = () => {
    localStorage.removeItem('jwt')
    setUser({jwt: null, data: null})
    setBoards([])
    history.push('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">Minesweeper</Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          { user.data && (
            <li className="nav-item">
              <a onClick={() => onLogout()} className="nav-link">Signout</a>
            </li>
          ) }

          { !user.data && (
            <li className="nav-item">
              <Link to="/sign" className="nav-link">Sign in</Link>
            </li>
          ) }
        </ul>
      </div>
    </nav>
  )
};