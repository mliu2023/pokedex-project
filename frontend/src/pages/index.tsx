import { Button, Container, HStack, Spacer, Text, SimpleGrid } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import CreditsModal from "@/components/CreditsModal";
import PokemonCard from "@/components/PokemonCard";
import GetPokemon from "@/components/GetPokemon";
import axios from "axios";

export default function Home() {
  const [creditsDialog, setCreditsDialog] = useState(false);
  const [pokemon, setPokemon] = useState([]);

  const loadPokemon = () => {
    axios.get("http://localhost:8080/pokemon")
      .then(res => {
        console.log(res.data);
        setPokemon(res.data.map((pokemon: any, index: number) =>
          <PokemonCard
            key={index}
            id={pokemon._id}
            name={pokemon.name}
            image={pokemon.image}
            stats={pokemon.stats}
            types={pokemon.types}
            loadPokemon={loadPokemon}/>));
      })
      .catch(error => {
        console.log(error)
      });
  }
  useEffect(() => {
    loadPokemon()
  }, [])
  return (
    <div>
      <CreditsModal
        isOpen={creditsDialog}
        onClose={() => setCreditsDialog(false)}
      />
      <Container maxW="container.lg">
        <HStack my={10}>
          <Text fontSize="5xl" fontWeight={800}>
            Pokédex
          </Text>
          <Spacer />
          <Button onClick={() => setCreditsDialog(true)}>Credits</Button>
        </HStack>
        <GetPokemon loadPokemon={loadPokemon} />
        <SimpleGrid paddingTop="8px" columns={3} spacing={3} width="100%">
          {pokemon}
        </SimpleGrid>
      </Container>
    </div>
  );
}
