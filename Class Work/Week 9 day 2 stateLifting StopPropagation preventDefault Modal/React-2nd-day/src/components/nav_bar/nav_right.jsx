import "./nav_right.style.scss";

const Nav_right = () => {
    return (
        <>
            <div
                className="header-style"
            >
                <ul className="ulist">
                    <li><a href="#" class="link">Products</a></li>
                    <li><a href="#" class="link">Categories</a></li>
                    <li>
                        <button><i className="fa-solid fa-cart-shopping"></i></button>
                    </li>
                    <li><a href="#" class="link">Sign in</a></li>
                </ul>

            </div>
        </>
    );
};

export default Nav_right;