function get_app_url() {
    console.warn("url is:", process.env.REACT_APP_API_BASE_URL);
    
    return  process.env.REACT_APP_API_BASE_URL;
}

export default get_app_url;