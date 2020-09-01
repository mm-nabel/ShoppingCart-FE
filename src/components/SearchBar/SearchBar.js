import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import './SearchBar.css';
import Product from '../Product/Product';
import Category from '../Category/Category';

const SearchBar = () => {
    const selector = useSelector(state => state);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [headerText, setHeaderText] = useState(`Results for ${selector.searchValue}`);
    const selectedCategory = selector.selectedCategory;
    // const products = selector.searchProducts;
    // const categories = selector.searchCategories;

    const productOverview = (prodId) => {
        console.log(prodId);
        // dispatch({type:'SET_SEARCH', payload:searchValue});
        history.push({
            pathname: `/product/${prodId}`,
            search: '',
            state: { productId: prodId }
        });
    }

    useEffect(() => {
        fetch(`http://localhost:8090/products/api/v1/search${location.search}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                if (res.products.length === 0) {
                    setHeaderText(`No search result for ${selector.searchValue}`);
                    setCategories([]);
                }
                const searchVal = location.search.substr(6, location.search.lengh);
                // dispatch({ type: "SET_SEARCH_PRODUCTS", payload: res.products })
                // dispatch({ type: "SET_SEARCH_CATEGORIES", payload: res.categories });
                dispatch({ type: "SET_SEARCH", payload: searchVal });
                setProducts(res.products);
                setCategories(res.categories);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const addCategory = (categoryId, type) => {
        switch (type) {
            case 0: {
                dispatch({ type: "SET_SEARCH", payload: "" });
                dispatch({ type: "SET_CATEGORY", payload: "" });
                history.push('/');
                break;
            }
            case 1: {
                fetch(`http://localhost:8090/products/api/v1/${categoryId}/search${location.search}`, {
                    method: "GET"
                })
                    .then(res => res.json())
                    .then(res => {
                        dispatch({ type: "SET_CATEGORY", payload: categoryId });
                        setProducts(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                break;
            }
            default: {
                console.log("DEFAULT CASE");
            }
        }
    }

    return (
        <div className="search-result">
            <div className="featured">
                <div className="featured-title">
                    <h1 className="page-header-title">{headerText}</h1>
                </div>
            </div>
            <div className="category-list">
                <Category addition="searchClass" category={{ name: selector.searchValue, categoryId: 0 }} fetchMe={() => addCategory(0, 0)} />
                {categories.map(category => (
                    category.categoryId === selectedCategory ?
                        (<Category addition="searchClass" category={category} key={category.categoryId} fetchMe={() => addCategory(category.categoryId, 1)} />)
                        :
                        (<Category category={category} key={category.categoryId} fetchMe={() => addCategory(category.categoryId, 1)} />)
                ))}
            </div>
            <div className="product-list">
                {products.map((product, productId) => (
                    <Product product={product} key={productId} getOverview={() => productOverview(product.productID)} />
                ))
                }
            </div>
        </div>
    )
}

export default SearchBar;