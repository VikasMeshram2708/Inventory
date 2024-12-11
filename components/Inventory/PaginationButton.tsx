/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { Button } from "../ui/button";

type PaginationProps = {
  page: number;
  limit: number;
  hasNextPage: boolean | undefined;
  totalPage: number | undefined;
};
export default function PaginationButton(props: PaginationProps) {
  const page = props?.page;
  const limit = props?.limit;
  const totalPages = props?.totalPage;
  return (
    <div className="container flex justify-end gap-2 mt-4">
      <Button disabled={page === 1} type="button">
        <Link href={`/?page=${page - 1}&limit=${limit}`}>Prev</Link>
      </Button>
      <Button disabled={page === totalPages} type="button">
        <Link href={`/?page=${page + 1}&limit=${limit}`}>Next</Link>
      </Button>
    </div>
  );
}
