import axios from 'axios';

const KEY = "29818725-64f51c77e1d6f6ee8deed1a05"


export const getImages = async (value: string, page: number) => {
    
    const data = await axios({
        url: `https://pixabay.com/api/?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&page=${page}&per_page=14`
    });
    return data.data
} 