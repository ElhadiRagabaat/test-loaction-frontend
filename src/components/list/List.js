import React, { useState,useEffect,createRef } from 'react'
import useStyle from './styles'
import PlaceDetails from '../details/Details'
import { CircularProgress, Typography, Grid, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core'

const List = ({places,currentlPaceId,isLoading,}) => {
    const classes = useStyle()
    const [type, setType] = useState("res")
    const [elRef,setElRef]=useState([])
    console.log({currentlPaceId})
   
    useEffect(()=>{
        const refs = Array(places.length).fill().map((_,i)=> elRef[i] || createRef())
        setElRef(refs)
        

    },[places])
   
    return (
        <div className={classes.container}>
            <Typography variant='h5'>Restaurants around you</Typography>
            {isLoading ?(
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
            ):(
                <>
            <FormControl className={classes.formControl}>
            </FormControl>
            <FormControl className={classes.formControl}>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i) => (
                    <Grid item key={i} xs={12}>
                        <PlaceDetails place={place} selected={currentlPaceId === i} 
                        refProp={elRef[i]}
                        
                        />

                    </Grid>
                ))}

            </Grid>
           
            
</>
 )}

        </div>
    )
}

export default List
