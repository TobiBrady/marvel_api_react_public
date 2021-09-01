import axios from "axios"
import React from "react"
import { PUBLIC_KEY, ts, hash } from "./Keys"

export class MarvelList extends React.Component {
    state = {
        total : [],
        character : [],
        comics : [],
    };
  
    async componentDidMount() {

        await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
        .then(res => {
            const total_characters = res.data.data.total;
            this.setState({ total : total_characters });
        })
        
        while (true) {

            const offset = Math.floor(Math.random()*this.state.total);

            await axios.get(`https://gateway.marvel.com/v1/public/characters?limit=1&offset=${offset}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
            .then(res => {
                const character_info = res.data.data.results;
                this.setState({ character : character_info });  
            })

            if (this.state.character[0].comics.available >= 5) {
                break;
            } else {
                this.setState({ character : [] });
            }
        }
        await axios.get(`https://gateway.marvel.com/v1/public/characters/${this.state.character[0].id}/comics?orderBy=-onsaleDate&limit=5&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
            .then(res => {
                const comics_info = res.data.data.results;
                this.setState({ comics : comics_info });  
        })
    }

    render() {

        return (
            <div className="z-0">

                <div className="w-full mt-12 bg-white shadow">
                    <h1 className="mx-auto pb-2 pt-3 text-xl text-center shadow">A random MARVEL comic book character out of a possible <span className="font-semibold">{this.state.total}</span></h1>
                </div>

                <div className="bg-black">
                
                    <div className="items-center justify-center">
                        {this.state.character.map(char => 
                        <div className="w-full content-around py-5">
                            
                            <img className="max-h-96 object-fit mx-auto my-5 shadow" src={`${char.thumbnail.path}.${char.thumbnail.extension}`} alt={`${char.name} thumbnail`}></img>
                            <h1 className="text-white text-5xl tracking-wide text-center mt-3">{char.name}</h1>
                            <p className="md:w-1/2 w-5/6 text-white text-center text-sm mx-auto mt-2">{char.description}</p>
                        </div>
                        )}
                    </div>

                </div>

                <div className="bg-gray-50">
                    <div className="w-full bg-white shadow">
                        <h1 className="mx-auto py-2 text-xl text-center mb-3">Their 5 most recent comic books</h1>
                    </div>

                    {this.state.comics.map(comic => 
                    <div className="w-11/12 mx-auto">
                        <div className="bg-white flex flex-col-reverse md:flex-row p-3 my-5 shadow">
                            <div className="md:w-3/4 md:py-5 md:pl-5 md:pr-10 ">
                                <h1 className="text-xl font-semibold">Title</h1>
                                <p className="text-justify text-sm">{comic.title}</p>
                                <h1 className="text-xl font-semibold pt-5">Date of release</h1>
                                <p className="text-justify text-sm">{comic.dates[0].date.split("T",1)}</p>
                                <h1 className="text-xl font-semibold pt-5">Description</h1>
                                <p className="text-justify text-sm">{comic.description}</p>
                            </div>
                            <div className="md:w-1/4 w-3/4 mb-5 md:mb-0 mx-auto">
                                <img className="shadow" src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={`${comic.name} thumbnail`}></img>
                            </div>
                        </div>
                    </div>
                    )}

                </div>

            </div>
        )
    }
}