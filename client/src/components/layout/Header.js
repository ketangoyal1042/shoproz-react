import React from 'react'
import { NavLink, Link } from "react-router-dom";
import { FaShoppingBag } from 'react-icons/fa';
import { useAuth } from '../../context/GlobalAuthState';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/GlobalCartState';
import { Badge } from "antd";
const Header = () => {
  const { Auth, setAuth } = useAuth();
  const [cart] = useCart();
  const categories = useCategory(); // created Hooks for fetching categories
  const navigate = useNavigate();
  const HandleLogout = () => {
    setAuth({
      user: null,
      token: ""
    });
    localStorage.clear('auth');
    toast.success("Logged out Successfully");
    navigate('/');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><FaShoppingBag /> shopRoj</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  category
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to={`/category`}>All Categories</Link></li>
                  {categories?.map((c) => (
                    <li><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
                  ))}
                </ul>
              </li>

              {/* <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/category">category</NavLink>
              </li> */}
              {
                !Auth.user ? (<><li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li></>) : (<>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {Auth?.user?.name}
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><NavLink className="dropdown-item" to={`/dashboard/${Auth?.user?.role === 0 ? "user" : "admin"}`}>Dashboard</NavLink></li>
                        <li className="nav-item">
                          <NavLink className="dropdown-item" onClick={HandleLogout} to="/login">Logout</NavLink>
                        </li>
                      </ul>
                    </li>

                  </>)
              }
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">Cart
                  <Badge count={cart?.length} showZero />
                  {console.log(cart)}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header