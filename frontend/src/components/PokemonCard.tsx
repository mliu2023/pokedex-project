import { useState, useEffect } from 'react';
import { Box, Divider, Text, VStack, HStack, Image, CloseButton, Center } from "@chakra-ui/react";
import axios from "axios";

interface Props {
    id: string;
    name: string;
    image: string;
    stats: Array<Stat>;
    types: Array<Type>;
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

interface Type {
    slot: number;
    type: {
        name: string;
        url: string;
    }
}

const PokemonCard = ({ id, name, image, stats, types, loadPokemon }: Props) => {
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

    const colorMap = new Map([
        ["bug", "#94BC4A"],
        ["dark", "#736C75"],
        ["dragon", "#6A7BAF"],
        ["electric", "#E5C531"],
        ["fairy", "#E397D1"],
        ["fighting", "#CB5F48"],
        ["fire", "#EA7A3C"],
        ["flying", "#7DA6DE"],
        ["ghost", "#846AB6"],
        ["grass", "#71C558"],
        ["ground", "#CC9F4F"],
        ["ice", "#70CBD4"],
        ["normal", "#AAB09F"],
        ["poison", "#B468B7"],
        ["psychic", "#E5709B"],
        ["rock", "#B2A061"],
        ["steel", "#89A1B0"],
        ["water", "#539AE2"],
    ]);

    return (
        <Box width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <CloseButton float="right" onClick={deletePokemon}></CloseButton>
            <Box p={10} paddingBottom="0px">
                <Text lineHeight="8px" fontSize="28px" fontWeight={600} align="center">
                    {name}
                </Text>
                <Image src={image} boxSize="80%" align="center" display="block" margin="auto" />
            </Box>
            <Center>
                <HStack paddingBottom="4px">
                {types.map((type) => 
                    <Box key={type.type.name} p={1} borderRadius="md" backgroundColor={colorMap.get(type.type.name)}>
                        <Text fontSize="12px">{type.type.name}</Text>
                    </Box>)}
                </HStack>
            </Center>
            <Divider />
            <Box p={2}>
                <VStack>
                {stats.map((stat) => 
                    <Text lineHeight="6px" fontSize="12px" key={stat.stat.name}>
                        {`${stat.stat.name}: ${stat.base_stat}`}
                    </Text>)}
                </VStack>
            </Box>
        </Box>
    );
}
export default PokemonCard;