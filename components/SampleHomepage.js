import Link from "next/link";
import useSWR from "swr";
import {
  Button,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Progress,
  Image,
  VStack,
} from "@chakra-ui/react";
import { buildImageUrl } from "utils/api";

const Home = ({ page, text }) => {
  let { data } = useSWR(`/api/${page}`);

  if (!data) {
    return <Progress size="lg" isIndeterminate />;
  }

  return (
    <SimpleGrid columns={[1, , , 3]} spacing="40" p="10">
      {data.slice(0, 3).map(({ id, title, poster_path }) => (
        <Card key={id}>
          <CardBody align="center">
              <Heading color="yellow">{title}</Heading>
            <Link href={`/movies/${id}`} passHref legacyBehavior>
              <Button w="80%" color="yellow" as="a" variant="solid" m="5">
                Movie details
              </Button>
            </Link>
            <Image
              src={buildImageUrl(poster_path)}
              alt="Movie Poster"
              w="80%"
              h="auto"
            />
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default function SampleHomepage({ page, text }) {
  return (
    <VStack>
      <Heading as="h2" align="center" mt={10} mb={3}>
        {page.charAt(0).toUpperCase() + page.slice(1)}
      </Heading>
      <Home align="center" page={page} text={text} />
    </VStack>
  );
}
