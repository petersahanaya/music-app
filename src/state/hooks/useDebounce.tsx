import { convertUrl, parsedUrl } from "@/lib/functions/parsedUrl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const useDebounce = (val: string) => {
  const [value, setValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setValue(val);

      const url = convertUrl({
        urls: window.location.href,
        path: "search",
        searchParams: [{ key: "q", value: value }],
      });

      router.replace(url);
    }, 300);
  }, [router, val, value]);

  return value;
};

export default useDebounce;
