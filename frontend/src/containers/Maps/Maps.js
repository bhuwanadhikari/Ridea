import React, { Component } from 'react';
import './Maps.css';
const { compose, withProps, lifecycle } = require("recompose");





const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    Marker
} = require('react-google-maps');


class Maps extends Component {

    state = {
        directions: null
    }
    componentDidMount() {
        const DirectionsService = new window.google.maps.DirectionsService();

        DirectionsService.route({
            origin: new window.google.maps.LatLng(28.201549, 83.970004),
            destination: new window.google.maps.LatLng(28.223537, 83.991109),
            travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {

            console.log(result);
            if (status === window.google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }


    render() {
        let iconMarker = new window.google.maps.MarkerImage(
            "https://www.shareicon.net/data/128x128/2016/06/16/594607_pin_32x32.png",
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(32, 32)
        );
        return (
            <GoogleMap
                defaultZoom={7}
                defaultCenter={new window.google.maps.LatLng(28.211784, 83.987447)}
            >
                {this.state.directions && <DirectionsRenderer directions={this.state.directions} />}

                <Marker
                    icon={iconMarker}
                    position={{ lat: 28.211784, lng: 83.987447 }}
                >
                </Marker>
            </GoogleMap >
        )
    }
}







// const Maps = compose(
//     withProps({
//         googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${keys.googleAPIKey}`,
//         loadingElement: <div style={{ height: `100%` }} />,
//         containerElement: <div style={{ height: `100vh` }} />,
//         mapElement: <div style={{ height: `100%` }} />,
//     }),
//     withScriptjs,
//     withGoogleMap,
//     lifecycle({
//         componentDidMount() {
//             const DirectionsService = new window.google.maps.DirectionsService();

//             DirectionsService.route({
//                 origin: new window.google.maps.LatLng(41.8507300, -87.6512600),
//                 destination: new window.google.maps.LatLng(41.8525800, -87.6514100),
//                 travelMode: window.google.maps.TravelMode.DRIVING,
//             }, (result, status) => {

//                 console.log(result);
//                 if (status === window.google.maps.DirectionsStatus.OK) {
//                     this.setState({
//                         directions: result,
//                     });
//                 } else {
//                     console.error(`error fetching directions ${result}`);
//                 }
//             });
//         }
//     })
// )(props =>
//     <GoogleMap
//         defaultZoom={7}
//         defaultCenter={new window.google.maps.LatLng(41.8507300, -87.6512600)}
//     >
//         {props.directions && <DirectionsRenderer directions={props.directions} />}
//     </GoogleMap>
// );
export default withScriptjs(withGoogleMap(Maps))