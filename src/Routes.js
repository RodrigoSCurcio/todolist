import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Users from './components/pages/Users/index';

export default (props) => {
    return (
        <Switch>
            <Route exact path='/'>
                <Users />
            </Route>
        </Switch>
    );
}