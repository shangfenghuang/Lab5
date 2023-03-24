var map = L.map('map').setView([51.032077, -114.052983], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);


function draw_Location(lat,long,temp){
    
    const blueIcon = icons()[0];
    const greenIcon = icons()[1];
    const redIcon = icons()[2];
    if (temp<10) {
        var marker = L.marker([lat, long], {
            icon: blueIcon
            }).addTo(map);
    }
    else if (10<=temp && temp<30){
        var marker = L.marker([lat, long], {
            icon: greenIcon
            }).addTo(map);
    }
    else if(30<=temp){
        var marker = L.marker([lat, long], {
            icon: redIcon
            }).addTo(map);
    }
    else{
        var marker = L.marker([lat, long]).addTo(map);
    }
    marker.bindPopup('<h5><p>Temperture: ' + temp + '</p></h5><h5><p>Lat: ' + lat + '</p></h5><h5><p>Long: ' + long+'</p></h5>').openPopup()
}

function icons(){
    const green = '#00FF00'

    const greenMarkerHtmlStyles = `
    background-color: ${green};
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`

    const greenIcon = L.divIcon({
    className: "my-custom-pin",
    html: `<span style="${greenMarkerHtmlStyles}" />`
    })
    const blue = '#0000FF'

    const blueMarkerHtmlStyles = `
    background-color: ${blue};
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`

    const blueIcon = L.divIcon({
    className: "my-custom-pin",
    html: `<span style="${blueMarkerHtmlStyles}" />`
    })
    const red = '#FF0000'

    const redMarkerHtmlStyles = `
    background-color: ${red};
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`

    const redIcon = L.divIcon({
    className: "my-custom-pin",
    html: `<span style="${redMarkerHtmlStyles}" />`
    });
    return [blueIcon, greenIcon, redIcon];
}