import {Button, Container, HStack, Spacer, Text, VStack} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import NewPostModal from "@/components/NewPostModal";
import Post from "@/components/Post";
import axios from "axios";

export default function Home() {
  const [newPostDialog, setNewPostDialog] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/posts")
      .then(res => {
        console.log(res.data);
        setPosts(res.data.map(post =>
          <Post
            key={post._id}
            title={post.title}
            body={post.body}
            postedAt={post.createdAt} />));
      });
  }, [])
  return (
    <div>
      <NewPostModal
        isOpen={newPostDialog}
        onClose={() => setNewPostDialog(false)}
      />
      <Container maxW="container.sm">
        <HStack my={10}>
          <Text fontSize="5xl" fontWeight={800}>
            Posts
          </Text>
          <Spacer />
          <Button onClick={() => setNewPostDialog(true)}>New</Button>
        </HStack>
        <VStack width="100%">
          {posts}
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp!"
            postedAt={new Date()}
          />
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp!"
            postedAt={new Date()}
          />
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp!"
            postedAt={new Date()}
          />
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp!"
            postedAt={new Date()}
          />
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp"
            postedAt={new Date()}
          />
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp"
            postedAt={new Date()}
          />
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp"
            postedAt={new Date()}
          />
        </VStack>
      </Container>
    </div>
  );
}
