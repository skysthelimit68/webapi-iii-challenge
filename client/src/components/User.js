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
                <Link to={`/${this.props.user.id}`}>
                <h1>{this.props.user.name}</h1>
                </Link>
                
            </div>
        )
    }
}

export default User;