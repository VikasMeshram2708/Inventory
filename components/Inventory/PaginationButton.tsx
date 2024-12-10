// "use client";

// import { fetchProducts } from "@/actions/inventory";
// import { Button } from "../ui/button";

// export default function PaginationButton({
//   currentPage,
//   totalPage,
// }: {
//   currentPage: number;
//   totalPage: number;
// }) {
//   async function handlePrev() {
//     const result = await fetchProducts(currentPage - 1);

//   }

//   function handleNext() {}

//   return (
//     <div className="container flex justify-end gap-2 mt-4">
//       <Button onClick={handlePrev} disabled={currentPage === 1}>
//         Prev
//       </Button>
//       <Button onClick={handleNext} disabled={currentPage === totalPage}>
//         Next
//       </Button>
//     </div>
//   );
// }
