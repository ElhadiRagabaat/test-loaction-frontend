import { useState, useEffect } from 'react';
import { Room, Star, Cancel, Place } from "@material-ui/icons"
import ReactMapGL, { Marker, Popup} from 'react-map-gl';
import axios from "axios"
import { format } from "timeago.js"
import './style.css'


import { Paper, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import LocationOnOutLineIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'
import useStyles from './styles'

function Map({ places,setCurrentlPaceId }) {
  const isDesktop = useMediaQuery('(min-width:600px)')
  const classes = useStyles()
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"))
  const [pins, setPins] = useState([])
  const [newPleace, setNewPlace] = useState(null)
  // const [currentlPaceId, setCurrentlPaceId] = useState(null)
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [rating, setRating] = useState(0)
  const [fileName, setFileName] = useState("")
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 32.05724005389291,
    longitude: 34.78063393951744,

    zoom: 17
  });

  const onChangeFile = e => {
    setFileName(e.target.files[0])
  }

  const handleMarkerClick = (id, lat, long) => {

    setCurrentlPaceId(id)
    setViewport({ ...viewport, latitude: lat, longitude: long })
  }

  const handleAddClick = (e) => {
    console.log(e)
    const [long, lat] = e.lngLat
    setNewPlace({
      lat: lat,
      long: long
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let fromData = new FormData()
    fromData.append("username", currentUser);
    fromData.append("title", title);
    fromData.append("desc", desc);
    fromData.append("rating", rating);
    fromData.append("lat", newPleace.lat);
    fromData.append("long", newPleace.long);
    fromData.append("imageUrl", fileName);
  
    try {
      const res = await axios.post("/pins", fromData)
      setPins(res)
      console.log(res.data)
      setNewPlace(null)
    } catch (err) {
      console.log(err)
    }
  }
  const geolocateControlStyle = {
    right: 10,
    top: 10
  };

  const handleLogout = () => {
    myStorage.removeItem("user")
    setCurrentUser(null)
  }
  return (
    <div className={classes.mapContainer}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/elhadiragabaat/ckqr74qg202dr17p88pg7z66j"
        onDblClick={handleAddClick}
        transitionDuration="500"
        
      >
        {places.map(p => (
          <div key={p._id}>

            <Marker latitude={p.lat} longitude={p.long} offsetLeft={-viewport.zoom * .7} offsetTop={-viewport.zoom * 2} className={classes.markerContainer}
               >
              
              {!isDesktop ? (
                <LocationOnOutLineIcon color="primary" fontSize="large" className={classes.pointer} />
              ) :
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.Typography} variant="subtitle2" gutterBottom>
                    {p.title}
                  </Typography>
                  <img src={`/upload/${p?.imageUrl}`} alt={p.title} className={classes.pointer}
                  style={{width:"70px",objectFit:"cover"}}
                  onClick={() => handleMarkerClick(p._id,p.lat,p.long)}
                
                  />
                </Paper>
              }

            </Marker>
            
          </div>
        ))}

        {newPleace && (

          <Popup
            latitude={newPleace.lat}
            longitude={newPleace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="left">
            <div>
              <form onSubmit={handleSubmit} enctype="multipart/form-data">
                <div>
                  <label htmlFor="file">Choose Image</label>
                  <input type="file" filename="imageUrl" onChange={onChangeFile} />
                </div>
                <label>Title</label>
                <input type="text" placeholder="Enter a Title" onChange={(e) => setTitle(e.target.value)} />
                <label>Review</label>
                <textarea placeholder="say something abute this place" onChange={(e) => setDesc(e.target.value)} />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit" className='submitButton'>Add Pin</button>
              </form>
            </div>
          </Popup>

        )}

      </ReactMapGL>

    </div>
  );
}

export default Map;
