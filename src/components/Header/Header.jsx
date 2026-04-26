import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logo, LogoutBtn } from "..";

function Header() {
  const userStatus = useSelector((state) => state.status);
  const username = useSelector(
    (state) => state.userData && state.userData.name.toUpperCase(),
  );

  const navItems = [
    { label: "Home", slug: "/", active: true },
    { label: "Login", slug: "/login", active: !userStatus },
    { label: "All Posts", slug: "/all-posts", active: userStatus },
    { label: "Add Post", slug: "/add-post", active: userStatus },
    { label: username, active: userStatus },
    { label: "Sign Up", slug: "/signup", active: !userStatus },
  ];

  return (
    <div className="header">
      <Logo />
      <ul>
        {navItems.map((item) => {
          return (
            item.active && (
              <li key={item.label}>
                <Link to={item.slug}>{item.label}</Link>
              </li>
            )
          );
        })}
        {userStatus && <LogoutBtn />}
      </ul>
    </div>
  );
}

export default Header;
