import Layout from "components/Layout";
import {
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
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import useSWR from "swr";


const WatchlistPage = () => {
  const { data, error } = useSWR(`/api/watchlist`);

  if (error) {
    return (
      <Text color="red">Error fetching movies: {JSON.stringify(error)}</Text>
    );
  }
  if (!data) {
    return <Progress size="lg" isIndeterminate />;
  }

  if (!data.length) {
    return (
      <Text m={10} fontSize="xl">
        Add some movies to your Watchlist page. You can add movies by searching
        for a movie and clicking the <Badge>Add to watchlist</Badge> button
        inside the movie page.
      </Text>
    );
  }

  return (
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
          {data.map(({ id, title, date}, index) => (
            <Tr key={id}>
              <Td>{index + 1}</Td>
              <Td>
                <Link href={`/movies/${id}`} passHref legacyBehavior>
                  <Text as="a">{title}</Text>
                </Link>
              </Td>
              <Td>
                {date}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default function Watchlist() {
  return (
    <Layout title="Watchlist" selected="/watchlist">
      <VStack>
        <WatchlistPage />
      </VStack>
    </Layout>
  );
}
