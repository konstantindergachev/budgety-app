import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.clickedLogOut();
    }
    render() {
        return <Redirect to="/" />;
    };
};
export default Logout;
