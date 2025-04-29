function get_url_for(port_type, target_type) {
    if (target_type === 'production') {
        return undefined;
    }

    let port; 
    const ip_address = process.env.REACT_APP_HOST_LAN_IP || 'localhost';
   
    if (port_type === 'server') {
        port = 3000; 
    }
    else if (port_type === 'app') {
        port = 5000; 
    }

    let address = "";
    if (target_type === 'lan') {
        address = "http://" + ip_address + ":" + String(port);
    }
    else if (target_type === 'local') { // dla komputera lokalnego lub produkcyjnego
        address = "http://localhost:" + String(port);
    }
    
    return address;
}

function get_cors_origin_urls(server_type) {
    if (server_type === 'lan') { // jeżeli server ma być dostępny przez sieć LAN    
                return [ get_url_for('server', 'lan'), 
            get_url_for('app', 'lan'), 
            get_url_for('server', 'local'), 
            get_url_for('app', 'local')];
    }
    else { // jeżeli serwer jest użyty lokalnie na komputerze lub serwerze produkcyjnym    
        return [get_url_for('server', 'local')];
    }
}
module.exports = { get_url_for, get_cors_origin_urls };
