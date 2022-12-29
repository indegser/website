// const getNewsDatabase = async (
//   { series }: { series: string | undefined } = { series: undefined }
// ) => {
//   const seriesFilter: PropertyFilter = series
//     ? { property: "series", relation: { contains: series } }
//     : null;

//   const productionFilter: PropertyFilter =
//     environment === "production"
//       ? {
//           property: "status",
//           select: { equals: "Production" },
//         }
//       : null;

//   const response = (await notion.databases.query({
//     database_id: "0021f4b0494546a596716a7a5d9db452",
//     sorts: [{ timestamp: "created_time", direction: "descending" }],
//     filter: {
//       or: [seriesFilter, productionFilter].filter(Boolean),
//     },
//   })) as NewsDatabaseType;

//   const promises = response.results.map(async (page) => {
//     const cover = getNotionFileUrl(page.cover);
//     if (!cover || cover.includes(CDN_ORIGIN)) return;

//     const response = await uploadImageToSupabase(cover, "cover");

//     if (!response) return;

//     await notion.pages.update({
//       page_id: page.id,
//       cover: {
//         external: {
//           url: response.publicURL,
//         },
//       },
//     });
//   });

//   await Promise.all(promises);
//   return response;
// };

export const newsApi = {};
