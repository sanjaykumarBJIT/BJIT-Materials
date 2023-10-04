import React from 'react';

const SearchBar = ({ searchKeyword, setSearchKeyword }) => {
  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className='search-button'>
      <form className="temp-form" onSubmit={handleSearchInputChange}>
        <div>
          <input
            type="text"
            className='search-Input'
            placeholder='Search anything here...'
            value={searchKeyword}
            onChange={handleSearchInputChange}
          />
        </div>
        <div>
          <button type="submit" className="searchButton">
            <i className="fa fa-search icon"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
