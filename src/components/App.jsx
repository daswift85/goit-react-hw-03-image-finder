import React, { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import CustomLoader from './Loader/Loader';
import fetchImages from './Services/Api';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    selectedImage: null,
    showLoadMoreButton: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  handleSubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      showLoadMoreButton: true,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = image => {
    this.setState({
      selectedImage: image,
    });
  };

  handleCloseModal = () => {
    this.setState({
      selectedImage: null,
    });
  };

  fetchImages = async () => {
    const { searchQuery, page, images } = this.state;

    if (!searchQuery) return;

    this.setState({
      isLoading: true,
    });

    try {
      const newImages = await fetchImages(searchQuery, page);

      this.setState(prevState => ({
        images: [...images, ...newImages],
        showLoadMoreButton: newImages.length === 12,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const { images, isLoading, selectedImage, showLoadMoreButton } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <CustomLoader />}
        {!isLoading && images.length > 0 && showLoadMoreButton && (
          <Button onClick={this.handleLoadMore} />
        )}
        {selectedImage && (
          <Modal image={selectedImage} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;
