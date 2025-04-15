function get_app_url(type='lan') {
    // jeżeli serwer internetowy
    if (type === 'production') {
        return undefined;
    }

    const port = 5000;
    const ip_address = '192.168.1.111';

    let address = "";
    if (type === 'lan') { // dla komputera dostępnego w sieci LAN 
        address = "http://" + ip_address + ":" + String(port);
        console.warn("@ GETTING LAN IP: " + ip_address);
    } // dla komputera lokalnie
    else if (type === 'local') { 
        console.warn("@ GETTING LOCAL IP: localhost");
        address = "http://localhost:" + String(port);
    }

    return address;
}

export default get_app_url;