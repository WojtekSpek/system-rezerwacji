function get_app_url(type='lan') {
    // jeżeli serwer internetowy
    if (type === 'production') {
        return undefined;
    }

    const port = 5000;
    const ip_address = process.env.REACT_APP_HOST_LAN_IP || 'localhost';
    
    let address = "";
    if (type === 'lan') { // dla komputera dostępnego w sieci LAN 
        address = "http://" + ip_address + ":" + String(port);       
    } // dla komputera lokalnie
    else if (type === 'local') {        
        address = "http://localhost:" + String(port);
    }

    return address;
}

export default get_app_url;