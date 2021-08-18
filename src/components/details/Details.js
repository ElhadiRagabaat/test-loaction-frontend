import React from 'react'
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Phone from '@material-ui/icons/Phone'
import Rating from '@material-ui/lab/Rating'
import useStyles from './styles'
import { Star } from "@material-ui/icons"
import './style.css'


const Details = ({ place,selected,refProp }) => {
    const classes = useStyles()

    if(selected){
        refProp?.current ?.scrollIntoView({behavior:"smooth",block: "start"})
    } 
    return (
        <Card elevation={6} key={place._id}>
            <CardMedia style={{ height: 350, paddingTop: '56.25%' }}
                image={`/upload/${place?.imageUrl}`}
                title={place.title}
            />
            <CardContent>
                <Typography variant='h5'>
                    {place.title}
                </Typography>
                <Typography variant='subtitle2' color='textSecondary'>{place.desc}</Typography>
                {place?.address && (
                    <Typography gutterBottom variant='body2' color='textSecondary' className={classes.subtitle}>
                        <LocationOnIcon/>{place.address}
                    </Typography>
                )}<LocationOnIcon/>     Nave shaana 7
            </CardContent>
            {/* <div className="stars">
            {Array(place.rating).fill(<Star className="star"/>)}
             </div>  */}
             <Rating  size ="small" value={place.rating}/>
        </Card>
    )
}

export default Details
