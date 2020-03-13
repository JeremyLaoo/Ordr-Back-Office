import React from 'react';
import {Link} from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Import icons
import RestaurantMenuTwoToneIcon from '@material-ui/icons/RestaurantMenuTwoTone';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SettingsIcon from '@material-ui/icons/Settings';





const drawerWidth = 260;


function Nav() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        width="100%"
        display="flex"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        
        <IconButton onClick={handleDrawerClose} className={classes.chevronRightIcon}>
        <img src="./images/Logo.png" width="100" height="60" style={{ marginRight: 60}} />
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      
      <List className={classes.listToolbar}>
        
          <Link to="/neworder">
          <ListItem button key= "order" className={classes.listItem}>
            <ListItemIcon > <ListAltIcon style={{ fontSize: 25, color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Gestion des commandes" />
          </ListItem>
          </Link>

          <Link to="/navmenu" >
          <ListItem button key="menu" className={classes.listItem}>
            <ListItemIcon > <RestaurantMenuTwoToneIcon style={{ fontSize: 25, color: 'white' }} /> </ListItemIcon>
            <ListItemText primary="Gestion du menu" />
          </ListItem>
          </Link>
        
          <Link to="/newtable" >
          <ListItem button key= "organisation" className={classes.listItem}>
            <ListItemIcon  ><SettingsIcon style={{ fontSize: 25, color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Gestion des tables" />
          </ListItem>
          </Link>
      </List>

    </Drawer>
    </div>
  );
}




// Style
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#011329',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  logo: {
    marginLeft: 670,
    backgroundColor: 'transparent'
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    backgroundColor: 'pink',
    display: 'none',
  },
  drawer: {
    
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    backgroundColor: '#011329',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: '#011329',
    backgroundOpacity: 20,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  titleTable:{
    fontWeight: 'bold',
    color: '#011429'
  },
  listToolbar:{
    color : "white",
  },
  listItem: {
    marginTop: 30,
    height:  60,
    color : "white"

  },

  chevronRightIcon:{
    color: "white",
  },
  title:{
    marginLeft :  720 
  },
  link:{
    color : 'white',
    fontSize:  '24'
  }


}));


export default Nav;