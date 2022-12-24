import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import Image from 'next/image';
import { buildImageUrl } from 'utils/api';
import {
  Input,
  IconButton,
  Container,
  Progress,
  Text,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Layout from 'components/Layout';

function SearchBar() {
  const router = useRouter();
  const { terms } = router.query;
  const [text, setText] = useState('');

  // Update text input when route changes (ex when user goes back/forward)
  useEffect(() => {
    setText(terms || '');
  }, [terms]);

  // Update router history if a search was performed
  const handleSearch = (event) => {
    event.preventDefault();
    if (text !== terms) {
      router.push(`/search/?terms=${text}`, undefined, { shallow: true });
    }
  };

  return (
    <InputGroup as="form" onSubmit={handleSearch}>
      <Input
        placeholder="Search for a movie..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
        />
      </InputRightElement>
    </InputGroup>
  );
}

function SearchResults() {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }
  if (!data.results.length) {
    return <Text>No results</Text>;
  }
  return (
    <TableContainer>
      <Table variant="striped">
        <Tbody>
          <Tr>
          {data.results.map(({ id, title, release_date, poster_path }) => (
            <Th key={id}>
              <Image
              src={buildImageUrl(poster_path, 'w300')}
              alt="Movie poster"
              layout="responsive"
              width="300"
              height="550"
              objectFit="contain"
              unoptimized
              />
              <Link href={`/movies/${id}`} passHref legacyBehavior>
              <Button
                as="a"
                variant="link"
                rightIcon={<Badge>{release_date}</Badge>}>
                <Text as="span">{title} </Text>
              </Button>
              </Link>
            </Th>
          ))};
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Container>
        <VStack spacing={4} align="stretch">
          <SearchBar />
          <SearchResults />
        </VStack>
      </Container>
    </Layout>
  );
}
