import "./header.style.css";
import Button from "./button"

const Header = () => {
    return (
        <>
            <div
                className="header-style"
            >
                <ul className="ulist">
                    <li><a href="#" class="link">Products</a></li>
                    <li><a href="#" class="link">Categories</a></li>
                    <li><a href="#" class="link">Cart</a></li>
                    <li><a href="#" class="link">Sign in</a></li>
                    <li><Button /></li>
                </ul>
                
            </div>
        </>
    );
};

export default Header;