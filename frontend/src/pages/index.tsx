import {Button, Container, HStack, Spacer, Text, VStack} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import EnterEmailModal from "@/components/EnterEmailModal";
import PokemonCard from "@/components/PokemonCard";
import GetPokemon from "@/components/GetPokemon";
import axios from "axios";

export default function Home() {
  const [enterEmailDialog, setEnterEmailDialog] = useState(false);
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
      <EnterEmailModal
        isOpen={enterEmailDialog}
        onClose={() => setEnterEmailDialog(false)}
      />
      <Container maxW="container.sm">
        <HStack my={10}>
          <Text fontSize="5xl" fontWeight={800}>
            Pokemon
          </Text>
          <Spacer />
          <Button onClick={() => setEnterEmailDialog(true)}>Mailing List</Button>
        </HStack>
        <VStack width="100%">
          <GetPokemon loadPokemon={loadPokemon}/>
          {pokemon}
        </VStack>
      </Container>
    </div>
  );
}
