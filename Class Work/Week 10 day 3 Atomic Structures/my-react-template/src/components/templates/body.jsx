import { createContext, useContext, useState, useEffect } from 'react';
import "./body.style.scss"
import useProductHook from "../../hooks/product/useProductHook"
import useProductDeletion from '../../hooks/product/useDeleteProduct';
import useUpdateProduct from '../../hooks/product/useUpdateProduct';
export const MyContextVariables = createContext();
import useSearchData from "../../hooks/product/useSearchProduct"
import { useForm, Controller } from 'react-hook-form';

//----------------Using atomic structure--------------------------
import Container from '../organisms/container/container';
import Header from '../organisms/header/header';
import Footer from '../organisms/footer/footer';

const Body = ({ bookData, loading }) => {

    console.log(bookData);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchedData, setSearchedData] = useState(bookData);

    const { searchData } = useSearchData(searchKeyword);

    const { createPost } = useProductHook();
    const { deletedProductId, error, deleteProduct } = useProductDeletion();
    const { updateProduct } = useUpdateProduct();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setSearchedData(searchData);

    }, [searchData])

    //-------------------------debounce----------------
    useEffect(() => {
        console.log("Search Keyword: ", searchKeyword);

        const timeoutId = setTimeout(() => {
            if (searchKeyword === '') {
                setSearchedData(bookData);
            } else {
                setSearchedData(searchData);
            }
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchKeyword, searchData, bookData]);



    const addToCart = (name, price) => {
        const updatedCart = [...cart, { name, price }];
        setCart(updatedCart);
        updateTotal(calculateTotalPrice(updatedCart));
    };

    const calculateTotalPrice = (cartItems) => {
        return cartItems.reduce((total, product) => total + product.price, 0);
    };

    const updateTotal = (newTotal) => {
        setTotal(newTotal);
    };

    console.log("Updated Cart:", cart, total)

    useEffect(() => {
        console.log("Updated Cart:", cart, total);
    }, [cart]);


    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [author, setAuthor] = useState("");
    const [releaseDate, setReleaseDate] = useState("");


    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        createPost(data);
    };


    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const UpdatedData = {
            name: name,
            price: price,
            stock: stock,
            author: author,
        }

        updateProduct(name, UpdatedData);

    };

    const handleDelete = (productId) => {
        deleteProduct(productId);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {/*---------------------Header Container Organisms-------------------------*/}
            <Header
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                openModal={openModal}
                cart={cart}
                total={total}
                closeModal={closeModal}
                isModalOpen={isModalOpen}
            />
            <div>
                <div className='temp'>
                    <div className='banner'>
                        <div className='banner-content'>
                            <h2>Your everyday book store</h2>
                        </div>
                    </div>
                    <div>
                        <h2>Products:</h2>
                    </div>
                    {/*---------------------Calling Container Organisms-------------------------*/}
                    <div>
                        <Container
                            searchedData={searchedData.data}
                            addToCart={addToCart}
                            handleDelete={handleDelete}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
            <div>
                {/* ------------------------------------react forms---------------------------------- */}
                <div className="form-section">
                    <h2>Create a New Product</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-field">
                            <label htmlFor="name">Name:</label>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => (
                                    <>
                                        <input type="text" {...field} />
                                        {errors.name && <p className="error">{errors.name.message}</p>}
                                    </>
                                )}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="price">Price:</label>
                            <Controller
                                name="price"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Price is required', pattern: /^[0-9]+$/ }}
                                render={({ field }) => (
                                    <>
                                        <input type="text" {...field} />
                                        {errors.price && <p className="error">{errors.price.message}</p>}
                                    </>
                                )}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="stock">Stock:</label>
                            <Controller
                                name="stock"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Stock is required',
                                    validate: (value) => {
                                        const parsedValue = parseInt(value, 10);
                                        return parsedValue > 0 || 'Stock must be a positive number';
                                    },
                                }}
                                render={({ field }) => <input type="number" {...field} />}
                            />
                            {errors.stock && <p className="error">{errors.stock.message}</p>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="author">Author:</label>
                            <Controller
                                name="author"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Author is required' }}
                                render={({ field }) => <input type="text" {...field} />}
                            />
                            {errors.author && <p className="error">{errors.author.message}</p>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="releaseDate">Release Date:</label>
                            <Controller
                                name="releaseDate"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input type="text" {...field} />}
                            />
                        </div>

                        <button type="submit">Create Product</button>
                    </form>
                </div>
            </div>
            <div>
                <div className="form-section">
                    <h2>Update a Existing Product</h2>
                    <form onSubmit={handleUpdateSubmit}>
                        <div className="form-field">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="stock">Stock:</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="author">Author:</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                        <button type="submit">Update Product</button>
                    </form>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Body