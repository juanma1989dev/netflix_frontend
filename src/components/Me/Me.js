import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Firebase from '../../Firebase';
import FormMe from './FormMe';


const QUERY_ME = gql`
    query me{
        me{
            name,
            lastname, 
            email,
            birth_date,
            password,
            gender,
            avatar,
            suscription{
                suscription_type
            }
        }
    }
`

class Me extends Component {

    copyData = (data) => {
        this.setState(
            {...data.me}
        )
    }

    render() {
        return (
            <Query query={QUERY_ME} >
            {
                ({loading, err, data})=> {
                    if(loading) return (<h4>loading ...</h4>)
                    if(err) return (<h4>{err}</h4>)
                    return(
                        <FormMe data={data.me} />
                    )
                }

            }
            </Query>

        )
    }
}

export default Me;