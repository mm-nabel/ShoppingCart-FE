import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Search.css';
const Search = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state=>state);
    const history = useHistory();
    const [searchValue, setSearchValue] = useState('');

    const onSearch = (e) => {
        if(e.key ==='Enter') {
            dispatch({type:'SET_SEARCH', payload:searchValue});
            history.push({
                pathname: '/search',
                search: `?name=${searchValue}`
            })
            window.location.reload();
        }
    }

    return (
        <input
            className="searchon"
            type="text"
            id="ss_text"
            name="ss_text"
            placeholder="What are you looking for?"
            onKeyPress={e=>onSearch(e)}
            defaultValue={selector.searchValue}
            onChange={event => setSearchValue(event.target.value)}
        ></input>
    )
}

export default Search;