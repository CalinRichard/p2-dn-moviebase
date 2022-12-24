import { AddIcon, CalendarIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from 'utils/api';

export default function HistoryButton() {
  const { id } = useRouter().query;
  const { data } = useSWR(`/api/history/${id}`);
  const { mutate } = useSWRConfig();

  return (
    <Tooltip label={data?.found ? 'Remove from watchlist' : 'Add to watchlist'}>
      <IconButton
        isLoading={!data}
        colorScheme={data?.found ? 'yellow' : 'gray'}
        size="sm"
        onClick={() => {
          mutate(`/api/history/${id}`, () =>
            fetcher(`/api/history/${id}`, {
              method: data.found ? 'DELETE' : 'POST',
            })
          );
        }}
      >
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}