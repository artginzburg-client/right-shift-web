export default function SS({
  params,
  searchParams,
}: {
  params: { key: string };
  searchParams: Record<string, string>;
}) {
  const searchParamsString = new URLSearchParams(searchParams).toString();
  const ssUrl = `ss://${decodeURIComponent(params.key)}${
    searchParamsString ? `/?${searchParamsString}` : ''
  }`;
  return (
    <html lang="zxx">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${ssUrl}`} />
      </head>
    </html>
  );
}
