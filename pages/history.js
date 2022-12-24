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
import dateFormat from "utils/dateFormat";
import HistoryForm from "components/HistoryForm";

const HistoryPage = () => {
  const { data, error } = useSWR(`/api/history`);

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
        Add some movies to your History page. You can add movies by searching
        for a movie and clicking the <Badge>Add to history</Badge> Icon inside
        the movie page.
      </Text>
    );
  }

  return (
    <>
      <TableContainer w={["100%", , "95%", "90%", "80%", "60%"]}>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Title</Th>
              <Th>Watched</Th>
              <Th>Location</Th>
              <Th>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(({ id, title, date, location, rating }, index) => (
              <Tr key={id}>
                <Td>{index + 1}</Td>
                <Td>
                  <Link href={`/movies/${id}`} passHref legacyBehavior>
                    <Text as="a">{title}</Text>
                  </Link>
                </Td>
                <Td>{dateFormat(date)}</Td>
                <Td>{location}</Td>
                <Td>{rating?.toFixed(1)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <HistoryForm />
    </>
  );
};

export default function History() {
  return (
    <Layout title="History" selected="/history">
      <VStack>
        <HistoryPage />
      </VStack>
    </Layout>
  );
}
