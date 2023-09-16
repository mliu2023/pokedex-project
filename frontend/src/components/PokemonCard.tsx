import { Box, Divider, Text } from "@chakra-ui/react";

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
        <Box width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box p={20}>
                <Text fontSize="lg" fontWeight={600}>
                    {name}
                </Text>
                <img src={image}></img>
            </Box>
            <Divider />
            <Box p={20}>
                <Text fontSize="sm">
                    {stats.map((stat) => <div>`${stat.stat.name}: ${stat.base_stat}`</div>)}
                </Text>
            </Box>
        </Box>
    );
}
export default PokemonCard;