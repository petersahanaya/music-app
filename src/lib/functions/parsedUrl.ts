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
    if (url.searchParams.has(param.key)) {
      url.searchParams.set(param.key, param.value);

      result = url.href;
    } else {
      url.searchParams.append(param.key, param.value);

      result = url.href;
    }
  });

  return result;
};

type ConvertUrlProps = {
  path: string;
  urls: string;
  searchParams?: {
    key: string;
    value: string;
  }[];
};
export const convertUrl = ({
  path,
  searchParams,
  urls,
}: ConvertUrlProps): string => {
  const url = new URL(urls);
  url.pathname = path;

  let result = url.href;

  if (!searchParams || !searchParams.length) return result;

  searchParams.forEach((param) => {
    if (url.searchParams.has(param.key)) {
      url.searchParams.set(param.key, param.value);

      result = url.href;
    } else {
      url.searchParams.append(param.key, param.value);

      result = url.href;
    }
  });

  return result;
};
