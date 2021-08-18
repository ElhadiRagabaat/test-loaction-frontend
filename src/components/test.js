import { useState, useEffect } from 'react';
import { Room, Star, Cancel } from "@material-ui/icons"
import ReactMapGL, { Marker, Popup, mapStyle, GeolocateControl } from 'react-map-gl';
import axios from "axios"
import { format } from "timeago.js"
import Register from './components/Register';
import Login from './components/Login';
import RecipeReviewCard from './components/Card';
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutLineIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab'
import useStyles from './styles'

function Map() {
    const classes = useStyles()
    const myStorage = window.localStorage;
    const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"))
    const [pins, setPins] = useState([])
    const [newPleace, setNewPlace] = useState(null)
    const [currentlPaceId, setCurrentlPaceId] = useState(null)
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [showRegister, setShowRegister] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [rating, setRating] = useState(0)
    const [fileName, setFileName] = useState("")
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 32.083333,
        longitude: 34.7999968,
        zoom: 16
    });

    const onChangeFile = e => {
        setFileName(e.target.files[0])
    }

    useEffect(() => {

        const getPins = async () => {

            try {

                fetch("/pins")
                    .then(res => res.json())
                    .then(data => setPins(data))
                // const res = await axios.get("/pins")
                // console.log(res.data)
                // setPins(res.date)

            } catch (err) {
                console.log(err)
            }
        };
        getPins()

    }, [])
    const handleMarkerClick = (id, lat, long) => {

        setCurrentlPaceId(id)
        setViewport({ ...viewport, latitude: lat, longitude: long })
    }

    const handleAddClick = (e) => {
        // e.preventDefault();
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
        // const newPin ={
        //   username:currentUser,
        //   title,
        //   desc,
        //   rating,
        //   lat:newPleace.lat,
        //   long:newPleace.long
        // }
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

                {pins.map(p => (
                    <div key={p._id}>
                        <Marker latitude={p.lat} longitude={p.long} offsetLeft={-viewport.zoom * .7} offsetTop={-viewport.zoom * 2}>
                            <Room style={{ fontSize: viewport.zoom * 2, color: currentUser ? "tomato" : "slateblue", cursor: "pointer" }}
                                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                            />
                        </Marker>
                        {p._id === currentlPaceId && (
                            <div
                                latitude={p.lat}
                                longitude={p.long}
                                offsetTop={-30}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => setCurrentlPaceId(null)}
                                anchor="left" >
                                {/* <div className="card"> */}
                                {/* <label >Place</label>
      <h4 className="place"> {p.title}</h4>
      // <Cancel className="loginCancel" onClick={() => setCurrentlPaceId(null)}/>
      <div className="imageUrl">
        <img src={`/upload/${p.imageUrl}`} alt="Images"/>
      </div> */}

                                {/* <p className='desc'>{p.desc}</p>
            
            <div className="stars">
            {Array(p.rating).fill(<Star className="star"/>)}
             </div> */}
                                <Cancel className="loginCancel" onClick={() => setCurrentlPaceId(null)} />
                                <RecipeReviewCard _id={p._id} title={p.title} imageUrl={`/upload/${p.imageUrl}`} desc={p.desc}
                                    setCurrentlPaceId={setCurrentlPaceId}
                                    username={p.username} date={format(p.createdAt)}
                                />

                                {/* <span className='username'>Creacted by <b>{p.username}</b></span>
            <span className='date'>{format(p.createdAt)}</span> */}

                            </div>
                            // </div> 

                        )}
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
                                {/* <label>Description</label> */}
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

                {currentUser ? (<button className="button logout" onClick={handleLogout}>Log out</button>) : (
                    <div className="buttons">
                        <button className="button login" onClick={() => setShowLogin(true)}>Login</button>
                        <button className="button register" onClick={() => setShowRegister(true)}>Register</button>

                    </div>
                )}

                {showRegister && <Register setShowRegister={setShowRegister} />}
                {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser} />}

            </ReactMapGL>

        </div>
    );
}

export default Map;
