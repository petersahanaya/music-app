type ParsedUrlProps = {
  path: string;
  searchParams?: {
    key: string;
    value: string;
  }[];
};

export const parsedUrl = ({ path, searchParams }: ParsedUrlProps): string => {
  const url = new URL("", "http://localhost:3000");
  url.pathname = path;

  let result = url.href;

  if (!searchParams || !searchParams.length) return result;

  searchParams.forEach((param) => {
    url.searchParams.append(param.key, param.value);

    result = url.href;
  });

  return result;
};
