import { useEffect, useState } from 'react';

import { useQuery } from 'react-query';

const fetchISRTest = async () => {
  const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
  await sleep(2000);
  const result = {
    date: new Date().toLocaleTimeString(),
  };
  return result;
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const isrData = JSON.stringify({ date: new Date().toLocaleTimeString() });
  const id = params?.id;

  const data = {
    id: id,
    title: 'ISR TEST',
  };

  return {
    props: {
      data,
      isrData,
    },
    revalidate: 60,
  };
};

const Page = ({ data, isrData }) => {
  const [date, setDate] = useState(JSON.parse(isrData).date);

  const { data: updateData } = useQuery(['date', data.id], fetchISRTest);

  useEffect(() => {
    updateData && setDate(String(updateData?.date));
  }, [updateData]);

  return (
    <>
      {data && (
        <div key={data.id}>
          {data.title},{data.id}
        </div>
      )}
      {date}
    </>
  );
};

export default Page;
