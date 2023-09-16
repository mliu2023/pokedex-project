import { Box, Divider, Text, VStack, Image } from "@chakra-ui/react";

interface Props {
    name: string;
    image: string;
    stats: Array<Stat>;
}

interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

const PokemonCard = ({ name, image, stats }: Props) => {
    return (
        <Box width="75%" borderWidth="1px" borderRadius="lg" overflow="hidden">
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