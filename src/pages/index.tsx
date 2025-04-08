import { useEffect } from "react";
import { useRouter } from "next/router";

const Head = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home");
  }, [router]);

  return null;
};

export default Head;
