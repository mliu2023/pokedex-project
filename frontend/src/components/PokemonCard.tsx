import { useState, useEffect } from 'react';
import { Box, Divider, Text, VStack, Image, CloseButton } from "@chakra-ui/react";
import axios from "axios";

interface Props {
    id: string;
    name: string;
    image: string;
    stats: Array<Stat>;
    loadPokemon: Function;
}

interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

const PokemonCard = ({ id, name, image, stats, loadPokemon }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        loadPokemon();
    }, [isLoading])

    function deletePokemon(){
        console.log(id);
        setIsLoading(true);
        axios.delete(`http://localhost:8080/pokemon/${id}`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
        .then(() => {
            setIsLoading(false);
        });
    }
    return (
        <Box width="75%" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <CloseButton float="right" onClick={deletePokemon}></CloseButton>
            <Box p={10} paddingBottom="0px">
                <Text fontSize="36px" fontWeight={600} align="center">
                    {name}
                </Text>
                <Image src={image} boxSize="80%" align="center" display="block" margin="auto" />
            </Box>
            <Divider />
            <Box p={2}>
                <VStack>
                {stats.map((stat) => <Text fontSize="12px" key={stat.stat.name}>{`${stat.stat.name}: ${stat.base_stat}`}</Text>)}
                </VStack>
            </Box>
        </Box>
    );
}
export default PokemonCard;