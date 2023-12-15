import { notFound } from 'next/navigation';

const getData = async (databaseId: string) => {
  return { data: [], error: null };
};

export default async function Page({
  params,
}: {
  params: { database_id: string };
}) {
  const { data, error } = await getData(params.database_id);

  if (error) {
    return notFound();
  }

  return null;
  // return (
  //   <PageContainer>
  //     <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
  //       {data?.map((result) => {
  //         return <RichItem key={result.id} page={result} />;
  //       })}
  //     </div>
  //   </PageContainer>
  // );
}
