import React from 'react'
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core"
import Typed from 'react-typed'
import useStyles from "./styles"

const Header = () => {
    const classes = useStyles()
    return (
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5">
                <Typed
                            style={{ color: "tomato" }}
                            strings={["Hello","Wellcom to NEVE-SHAANAN","Explore  NEVE-SHAANAN Restaurants"]}
                            typeSpeed={40}
                            backSpeed={60}
                            loop
                        />
                </Typography>
                <Box display="flex">
                    <Typography variant="h6">
                        <div className={classes.title}>
                        Explore South Tel Aviv
                        </div>
                       
                   
                    </Typography>
                    
                </Box>
            </Toolbar>

        </AppBar>
    )
}

export default Header
