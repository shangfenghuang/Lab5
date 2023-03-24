function send_locations(){
    loc_status = document.getElementById('loc-status');
    locations = document.getElementById('location');

    function success(position) {
        if (connected_flag==0){
            out_msg="<b>Not Connected so can't send</b>"
            console.log(out_msg);
            document.getElementById("loc-status").innerHTML = out_msg;
            return false;
        }
        latitude  = position.coords.latitude;
        longitude = position.coords.longitude;
        loc_status.textContent = '';
        var temperture = Math.floor(Math.random() * 101) - 40;
        locations.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} ° - Temperture: ${temperture} °C`;
        
        draw_Location(latitude, longitude,temperture);
        var geojson = {"name": "shangfeng",
            "features":[{
                "type":"Feature",
                "geometry":{
                    "type":"Point",
                    "coordinates":[]
                },
                "properties":{
                    "temp":[]
                }
            }]
        };
        geojson.features[0].geometry.coordinates.push([latitude, longitude]);
        geojson.features[0].properties.temp.push([temperture]);
        var msg = JSON.stringify(geojson);
        console.log(msg);

        var topic = "Lab5/shangfeng/my_temperature";
        message = new Paho.MQTT.Message(msg);
        if (topic=="")
            message.destinationName = "test-topic"
        else
            message.destinationName = topic;
        mqtt.send(message);
        return false;
    }

    function error() {
        loc_status.textContent = 'Unable to retrieve your location';
    }

    if(!navigator.geolocation) {
        loc_status.textContent = 'Geolocation is not supported by your browser';
    } else {
        loc_status.textContent = 'Locating…';
        // console.log('sada');
        navigator.geolocation.getCurrentPosition(success, error);
    }
    return false;
}


function onConnectionLost(){
	console.log("connection lost");
	document.getElementById("status").innerHTML = "Connection Lost";
	document.getElementById("messages").innerHTML ="Connection Lost";
	connected_flag=0;
    if (keep_connect)
    {
        document.getElementById("messages").innerHTML = "Connection Failed- Retrying";
        setTimeout(MQTTconnect, reconnectTimeout);
    }
}

function onFailure(message) {
    if (keep_connect){
        console.log("Failed");
        document.getElementById("messages").innerHTML = "Connection Failed- Retrying";
        setTimeout(MQTTconnect, reconnectTimeout);
    }
}

function onMessageArrived(r_message){
    out_msg="Message received "+r_message.payloadString+"<br>";
    out_msg=out_msg+"Message received Topic "+r_message.destinationName;
    //console.log("Message received ",r_message.payloadString);
    console.log(out_msg);
    flag = r_message.payloadString.substr(2, 4) == "name";
    if (flag){
        loc_msg = JSON.parse(r_message.payloadString);
        document.getElementById("messages").innerHTML = "Location: " + loc_msg['features'][0]['geometry']['coordinates'][0] + "-" +  "temperture: " + loc_msg['features'][0]['properties']['temp'][0][0];
        draw_Location(loc_msg['features'][0]['geometry']['coordinates'][0][0], loc_msg['features'][0]['geometry']['coordinates'][0][1],
        loc_msg['features'][0]['properties']['temp'][0][0]);
    }
    // document.getElementById("messages").innerHTML =out_msg;
}

function onConnected(recon, url){
    console.log(" in onConnected " +reconn);
}


function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    document.getElementById("messages").innerHTML ="Connected to "+host +"on port "+port;
    connected_flag=1
    document.getElementById("status").innerHTML = "Connected";
    console.log("on Connect "+connected_flag);
}

function disconnect()
{
    keep_connect = false;
    document.getElementById('server').disabled = false;
    document.getElementById('port').disabled = false;
    document.getElementById("status").innerHTML = "Connection Stop";
	document.getElementById("messages").innerHTML ="Connection Stop";
    if (connected_flag == 1) mqtt.disconnect();
}

function MQTTconnect() {
    keep_connect = true;
    id_server = document.getElementById('server')
    id_server.disabled = true;
    id_port = document.getElementById('port')
    id_port.disabled = true;
    document.getElementById("status").innerHTML ="";
    var s = id_server.value;
    var p = id_port.value;
    if (p!="")
    {
    console.log("ports");
        port=parseInt(p);
        console.log("port" +port);
        }
    if (s!="")
    {
        host=s;
        console.log("host");
        }
    console.log("connecting to "+ host +" "+ port);
    var x=Math.floor(Math.random() * 10000); 
    var cname="orderform-"+x;
    mqtt = new Paho.MQTT.Client(host,port,cname);
    //document.write("connecting to "+ host);
    var options = {
        useSSL:true,
        timeout: 10,
        onSuccess: onConnect,
        onFailure: onFailure,
        
        };

        mqtt.onConnectionLost = onConnectionLost;
        mqtt.onMessageArrived = onMessageArrived;
        //mqtt.onConnected = onConnected;

    mqtt.connect(options);
    return false;
}


function sub_topics(){
    document.getElementById("messages").innerHTML ="";
    if (connected_flag==0){
        out_msg="<b>Not Connected so can't subscribe</b>"
        console.log(out_msg);
        document.getElementById("messages").innerHTML = out_msg;
        return false;
    }
    var stopic= document.getElementById("Topic").value;
    document.getElementById("messages").innerHTML = "Subscribing to topic ="+stopic;
    console.log("Subscribing to topic ="+stopic);
    mqtt.subscribe(stopic);
    return false;
}


function send_message(){
    console.log(0);
    document.getElementById("messages").innerHTML ="";
    if (connected_flag==0){
        out_msg="<b>Not Connected so can't send</b>"
        console.log(out_msg);
        document.getElementById("messages").innerHTML = out_msg;
        return false;
    }
    var msg = document.forms["smessage"]["send_messages"].value;
    console.log(msg);

    var topic = document.forms["smessage"]["Ptopic"].value;
    message = new Paho.MQTT.Message(msg);
    if (topic=="")
        message.destinationName = "test-topic"
    else
        message.destinationName = topic;
    mqtt.send(message);
    return false;
}
