import { Box } from "./App.styled";
import React, { Component } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from "./utils/API";
import { Image } from "./utils/types";

//idle
//pending
//rejected
//resolved

interface IState {
  gallery: [] | any[];
  page: number;
  currentSearch: string;
  status: string;
  isShowLoadMore: boolean;
}

export class App extends Component<{}, IState> {
  state = {
    gallery: [],
    page: 1,
    currentSearch: "",
    status: "idle",
    isShowLoadMore: true
  }

  async componentDidUpdate(_: {}, prevState: IState): Promise<void> {
    const { currentSearch, page } = this.state;

    if (currentSearch !== prevState.currentSearch || page !== prevState.page) {
      try {
        
      this.setState({ status: "pending" });

      const data = await getImages(currentSearch, page);
      
      const images = await data.hits;
        
        if (images.length === 0) {
        this.notifyWarningInput();
        return 
      }
      
      if (!this.isThereImages(data.totalHits, page)) {
        this.setState({ isShowLoadMore: false })
        this.notifyInfo();
       }
     
      this.setState(({gallery}) => ({
        gallery: [...gallery, ...images],
        status: "resolved"
      }))
        
      } catch (error) {
        this.setState({status: "rejected"})
        this.notifyError(error);
      }
    }
  }

  handleFormSubmit = (value: string): void => {
    this.setState({
      currentSearch: value,
      page: 1,
      gallery: [], 
      isShowLoadMore: true
    })
  }
   
  handleLoadMore = (): void => { 
    this.setState(({ page }) => ({
        page: page + 1,
      }))
  }
  
  notifyWarningEmptyField = () => toast.warning("You can't leave an empty field");

  notifyWarningInput = () => toast.warning("Please enter a valid name");

  notifyInfo = () => toast.info("No more images");

  notifyError = (error: any) => {
    toast.error("Error, Something went wrong")
    console.log(error);
  }
  
  isThereImages(total: number, page: number, perPage = 14): boolean {
    const totalPages = Math.ceil(total / perPage);
    
    return page < totalPages;
  }
  
  render() {
    const { gallery, status, isShowLoadMore } = this.state;
    
    return <Box 
    //  display="grid"
    //  gridTemplateColumns="1fr"
    //  gridGap="16px"
    //  paddingBottom="24px"
    >
      
      <Searchbar onSubmit={this.handleFormSubmit} notify={this.notifyWarningEmptyField} />

      {gallery.length !== 0 &&
        <ImageGallery status={status} onClickLoadMore={this.handleLoadMore} isShowLoadMore={isShowLoadMore} >
           {gallery.map((image: Image) =>
                  < ImageGalleryItem
                      key={image.id}
                      image={image}
                       />
                )}
        </ImageGallery>}
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
    </Box>
  };
};
