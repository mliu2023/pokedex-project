import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import axios from "axios";

const GetPokemon = () => {
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e: any) {
        // Block the default form handler behavior.
        e.preventDefault();

        // Set isLoading to true while we make the API request.
        setIsLoading(true);

        // axios
        //     .post("http://localhost:8080/pokemon", {
        //         name: e.target.name.value,
        //         image: e.target.image.value,
        //         stats: e.target.stats.value,
        //     })
        //     .then((response) =>{
        //         console.log(response)
        //     })
        //     .catch((error) => {
        //         // handle error
        //         console.log(error);
        //     })
        //     .then(() => {
        //         setIsLoading(false);
        //     });
        getPokemon(e.target.name)
    }

    function getPokemon(name: string) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => {
                console.log(res.data);
                axios
                    .post("http://localhost:8080/pokemon", {
                        name: res.data.pokemon.name,
                        image: res.data.pokemon.sprites.front_default,
                        stats: res.data.pokemon.stats,
                    })
                    .then((response) => {
                        // handle success
                        console.log(response);
                    })
                    .catch((error) => {
                        // handle error
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
    <form onSubmit={handleSubmit}>
        <Input required name="name" placeholder="pokemon name" />
        <Button colorScheme="teal" type="submit" isLoading={isLoading}>
            Submit
        </Button>
    </form>
    );
};

export default GetPokemon;
