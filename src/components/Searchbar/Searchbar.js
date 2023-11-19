import { useState } from "react";
import toast from 'react-hot-toast';
import { FcSearch } from 'react-icons/fc';
import { SearchBarHeader, SearchButton, SearchForm, SearchInput } from "./Searchbar.style";

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  
  const handleChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();  
      if (query.trim() === '') {
        toast.error("Please fill the field!");
        return;
        } 
    onSubmit(query);
    setQuery('');
    };    

return (
      <SearchBarHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchButton type="submit">
            <FcSearch size="20px" />
          </SearchButton>
          <SearchInput
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </SearchForm>
      </SearchBarHeader>
    );
};
 

 
 
   
