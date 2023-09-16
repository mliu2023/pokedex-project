import {Button, Container, HStack, Spacer, Text, VStack} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import EnterEmailModal from "@/components/EnterEmailModal";
import Ticket from "@/components/Ticket";
import axios from "axios";

export default function Home() {
  const [newPostDialog, setNewPostDialog] = useState(false);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/tickets")
      .then(res => {
        console.log(res.data);
        setTickets(res.data.map(ticket =>
          <Ticket
            key={ticket._id}
            price={ticket.price}
            location={ticket.location}
            link={ticket.link} />));
      })
      .catch(error => {
        console.log(error)
      });
  }, [])
  return (
    <div>
      <EnterEmailModal
        isOpen={newPostDialog}
        onClose={() => setNewPostDialog(false)}
      />
      <Container maxW="container.sm">
        <HStack my={10}>
          <Text fontSize="5xl" fontWeight={800}>
            Tickets
          </Text>
          <Spacer />
          <Button onClick={() => setNewPostDialog(true)}>New</Button>
        </HStack>
        <VStack width="100%">
          {tickets}
        </VStack>
      </Container>
    </div>
  );
}
