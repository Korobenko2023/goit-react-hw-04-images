import { ModalWindow } from 'components/Modal/Modal';
import { useState } from 'react';
import { ImageGalleryImage, ImageGalleryItemLi } from './ImageGalleryItem.style';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen); 

  return (
      <ImageGalleryItemLi onClick={toggleModal}>
        <ImageGalleryImage src={webformatURL} alt={tags} />
        {isModalOpen && (
          <ModalWindow
            onClose={toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
            isOpen={isModalOpen}
          />
        )}
      </ImageGalleryItemLi>
    );
};


