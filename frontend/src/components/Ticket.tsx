import { Box, Divider, Text, VStack } from "@chakra-ui/react";

interface Props {
    price: number;
    location: String;
    link: String
}

const Ticket = ( { price, location, link }: Props) => {
    return (
        <Box width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box p={20}>
                <Text fontSize="lg" fontWeight={600}>
                    {price}
                </Text>
                <Text fontSize="sm">
                    {location}
                </Text>
            </Box>
            <Divider />
            <Box p={20}>
                <Text fontSize="sm">
                    {link}
                </Text>
            </Box>
        </Box>
    );
}
export default Ticket;