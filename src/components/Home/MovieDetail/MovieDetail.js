import React, {Component} from 'react'
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import YouTube from 'react-youtube';

const QUERY_MOVIE_DETAIL= gql`
    query movie($id:ID!) {
        movie(id: $id)
        {
            title,
            category,
            sinopsis,
            length,
            poster,
            video_url
        }
    }
`

class MovieDetail extends Component {
    
    constructor(props){
        super(props);
    }

    getVideoId = (url) => {
        return url.split("=")[1]
    }

    render(){
        const opts = {
            height: '390',
            width: '640',
            playerVars: { 
              autoplay: 1
            }
          };

        return(
            <Query query={QUERY_MOVIE_DETAIL} variables={{ id: this.props.match.params.id }}>
            {
                ({loading, err, data}) => {
                
                if(loading) return "cargando la pelicula"
                if(err) return "Error en el servicio"
                let videoId = ""

                return (
                    <div>
                        <h1>{ data.movie.title}</h1>

                        <YouTube
                            videoId={this.getVideoId(data.movie.video_url)}
                            opts={opts}
                        />
                    </div>
                )
            }}
            </Query>
        )
    }
}

export default MovieDetail;