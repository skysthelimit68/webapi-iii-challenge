import React from "react";
import User from "./User";
import axios from "axios";

class Users extends React.Component {
    constructor() {
        super();
        this.state={
            users : []
        }
    }

    componentDidMount() {
        axios
        .get("http://localhost:8800/api/users/")
        .then( result => {
            console.log(result)
            this.setState({
                users : result.data
            })
        })
        .catch( error => {
            console.log(error)
        })
    }
    render() {
        return(
            <div>
                {this.state.users.map( user => <User user={user}/>)}
            </div>
        )
    }
}

export default Users;