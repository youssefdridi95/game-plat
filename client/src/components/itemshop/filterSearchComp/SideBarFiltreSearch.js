import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import { ITEM_MOST_RECENT_SORT, ITEM_LEAST_RECENT_SORT } from '../../../actions/types';
import store from '../../../store';
import './SearchFilters.css';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    sidebarfilter: {
        display: 'flex',
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '50px',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    rangeslider: {
        width: 300,
    },
}));

function SideBarFiltreSearch({ filterBy, priceRange }) {
    // Drawer config
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    // poste filter / search config
    const [inputs, setInputs] = React.useState({
        name: '', petName: '', species: ''
    });
    const handleChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };
    const handleSubmit = (e, searchOption) => {
        e.preventDefault()
        filterBy(searchOption, inputs[searchOption])
    };
    // range slider state
    const [sliderVal, setSliderVal] = React.useState([0, 300]);

    const handleSliderChange = async (event, newValue) => {
        await setSliderVal(newValue);
        priceRange(sliderVal);
    };

    return (
        <div className={classes.sidebarfilter}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                    <Typography variant="h6" noWrap>
                        Barre de recherche
          </Typography>
                </IconButton>
            </Toolbar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <h4 className="myfilterby">Chercher par :</h4>
                    {[{ t: 'Nom du produit', v: 'name' }].map((el, index) => (
                        <ListItem key={el.v}>
                            <form onSubmit={(e) => handleSubmit(e, el.v)} >
                                <input placeholder={el.t} name={el.v} onChange={handleChange} className="myfilterby" />
                            </form>
                        </ListItem>
                    ))}
                    <ListItem >
                        <select onChange={e => filterBy('sexe', e.target.value)} className="myfilterby">
                            <option value="" selected>Tous sexes</option>
                            <option value="male">male</option>
                            <option value="femelle">femelle</option>
                        </select>
                    </ListItem>
                    <ListItem >
                        <select onChange={e => filterBy('species', e.target.value)} className="myfilterby">
                            <option value="" selected>Toutes espèces</option>
                            <option value="chien">chien</option>
                            <option value="chat">chat</option>
                            <option value="oiseau">oiseau</option>
                            <option value="cheval">cheval</option>
                            <option value="mouton">mouton</option>
                        </select>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <h4 className="myfilterby">Trier par :</h4>
                    <ListItem  >
                        <button onClick={() => store.dispatch({ type: ITEM_MOST_RECENT_SORT })} className="myfilterby">Plus récent</button>
                    </ListItem>
                    <ListItem  >
                        <button onClick={() => store.dispatch({ type: ITEM_LEAST_RECENT_SORT })} className="myfilterby">Moin récent</button>
                    </ListItem>
                    <ListItem>
                        <div className={classes.rangeslider}>
                            <Typography id="range-slider" gutterBottom>
                                Echelle des prix
                            </Typography>
                            <Slider
                                value={sliderVal}
                                onChange={handleSliderChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                            />
                        </div>
                    </ListItem>
                </List>
            </Drawer>

        </div >
    );
}
SideBarFiltreSearch.propTypes = {
    filterBy: PropTypes.func.isRequired
};
export default SideBarFiltreSearch