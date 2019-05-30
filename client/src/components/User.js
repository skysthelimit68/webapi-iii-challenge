import React from "react";
import { Link } from "react-router-dom"

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user : []
        }
    }

    componentDidMount() {
       
    }

    render() {
        return(
            <div>
                <h1>{this.props.user.name}</h1>
                
                <p>{this.props.user.id}</p>
            </div>
        )
    }
}

export default User;