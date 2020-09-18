// ToDo :
// get all users / get one user by id
// Delete user
// promote user to admin / depromote admin to user
// get user pets
// get number of adoption posts, pets in sale and shop items (optional)
// income statistics (optional)
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import GetUsers from './GetUsers';
import GetUser from './GetUser';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const Dashboard = props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>Wellcome My Master, What might you request</h1>
            <Router>
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Link to='/admin/get-users'><Button>get all users</Button></Link>
                    <Link to='/admin/get-user-by-id'><Button>get one user by id</Button></Link>
                    {/* <Link to='/admin/statistics'><Button>statistics</Button></Link> */}
                </ButtonGroup>
                <Switch>
                    <Route exact path='/admin/get-users'>chobik lobik !!! haw el users el kol<br/><GetUsers/></Route>
                    <Route exact path='/admin/get-user-by-id'>how lgitou<br/><GetUser/></Route>
                    {/* <Route exact path='/admin/statistics'>el3ab yala</Route> */}
                </Switch>
            </Router>
        </div>
    )
}

Dashboard.propTypes = {
    
}

export default Dashboard
