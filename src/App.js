import React ,{useState,useEffect}from 'react';
import { CssBaseline, Grid } from '@material-ui/core'
import Map from './components/map/MAp'
import Header from './components/header/Header'
import List from './components/list/List'
function App() {
  const [places, setPlaces] = useState([])
  const [currentlPaceId, setCurrentlPaceId] = useState(null)
  const [isLoading,setIsLoading]= useState(false)

  useEffect(() => {

    const getPins = async () => {
      setIsLoading(true)

      try {


        fetch("/pins")
          .then(res => res.json())
          .then(data => setPlaces(data))
          setIsLoading(false)
        // const res = await axios.get("/pins")
        // console.log(res.data)
        // setPins(res.date)

      } catch (err) {
        console.log(err)
      }
    };
    getPins()

  }, [])
  return (
    < React.Fragment>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List  places={places} currentlPaceId={currentlPaceId} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map places={places} setCurrentlPaceId={setCurrentlPaceId}/>
        </Grid>
      </Grid>


    </React.Fragment>
  );
}

export default App;