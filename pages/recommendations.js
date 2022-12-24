import Layout from "components/Layout";
import {
  Center,
  Text,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";
import useSWR from "swr";

const RecommendationsPage = () => {
  const { data, error } = useSWR(`/api/recommendations`);

  if (error) {
    return (
      <Text color="red">Error fetching movies: {JSON.stringify(error)}</Text>
    );
  }
  if (!data) {
    return <Progress size="lg" isIndeterminate />;
  }

  if (!data.similarMovie.results) {
    return (
      <Text m={10} fontSize="xl">
        Add some movies to your Watchlist or History page. You can add movies by
        searching for a movie and clicking the <Badge>Add to watchlist</Badge>{" "}
        or <Badge>Add to history</Badge> button inside the movie page.
      </Text>
    );
  }

  return (
    <>
      <Text m={5} align="center" fontSize="2xl">
        The recommendations is made based on your Watchlist and History Movies
      </Text>
      <Text m={5} mt={50} align="center" fontSize="xl">
        Top 5 similar movies based on
        <Badge color="yellow" ml={3} mr={3} variant="solid" colorScheme="blue" fontSize="1rem">
          {data.randomMovie?.title}
        </Badge>
      </Text>
      <Center>
      {data.similarMovie.results?.length > 0 &&  (
        <TableContainer w="80%">
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Title</Th>
                <Th>Release Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.similarMovie.results.slice(0, 5).map(
                ({ id, title, release_date }, index) => (
                  <Tr key={id}>
                    <Td textAlign="center">{index + 1}</Td>
                    <Td>
                      <Link href={`/movies/${id}`} passHref legacyBehavior>
                        <Text as="a">{title}</Text>
                      </Link>
                    </Td>
                    <Td>{release_date}</Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Center>
    </>
  );
};

export default function Recommendations() {
  return (
    <Layout title="Recommendations" selected="/recommendations">
      <RecommendationsPage />
    </Layout>
  );
}
