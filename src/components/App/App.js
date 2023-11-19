import { useEffect, useState } from "react";
import { animateScroll as scroll } from 'react-scroll';
import { fetchImages } from '../Services/Api';
import { GlobalStyle } from "components/Services/GlobalStyle";
import { Loader } from "components/Loader/Loader";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import toast, { Toaster } from 'react-hot-toast';
import { Button } from "components/Button/Button";
import { AppContainer } from "./App.style";

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
 
  useEffect(() => {
    if (query === '') {
      return
    }
  
    const getPhotos = async () => {  

    setIsLoading(true);
  
    try {           
      const { hits, totalHits } = await fetchImages(query, page);
      
        if (totalHits === 0 && page === 1) {
           toast.error('Sorry, there are no images matching your search query. Please try again.'); 
         return;
      } 

      setImages((prevImages) => [...prevImages, ...hits]);
     
      setLoadMore(page < Math.ceil(totalHits / 12));

      scroll.scrollToBottom({
            duration: 800,
            smooth: 'easeInOutQuart',
        });
      
    } catch (error) {
       toast.error('Oops! Something went wrong. Please try again later.', error);
    } finally {
      setIsLoading(false);
    }
    };
   
      getPhotos();
    
   }, [query, page]);
  
  const onSubmit = newQuery => {
    if (query !== newQuery) {       
      setQuery(newQuery);
      setImages([]);
      setPage(1);
    }  
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
      <AppContainer>        
        <Searchbar onSubmit={onSubmit} /> 
        {isLoading && <Loader />}
        {images.length > 0 && <ImageGallery images={images} />}
        {loadMore && <Button onClick={handleLoadMore} disabled={isLoading}></Button>}
        <GlobalStyle />
        <Toaster position="top-center" />
      </AppContainer>
    );
};

  

  
  

 
 
   