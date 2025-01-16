import { useQuery } from "react-query";
import "./App.css";
import axios from "./http-common";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateQueryModal } from "./CreateQueryModal";
import { ViewQueryModal } from "./ViewQueryModal";

const fetchFormData = async () => {
  const res = await axios.get("/form-data");
  console.log(res.data);
  return res.data;
};

function App() {
  const { data, isLoading, isError, refetch } = useQuery(
    "formData",
    fetchFormData
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error Loading Form Data</div>;
  return (
    <>
      <div className="h-full">
        <h2 className="text-xl font-semibold">Query Management Application</h2>
        <div className="mt-4 overflow-x-auto">
          <Table className="min-w-full table-auto border-collapse border border-gray-200">
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead className="text-center">Query</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.formData?.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="border px-4 py-3 text-left">
                    {item.question}
                  </TableCell>
                  <TableCell className="border px-4 py-3 text-left">
                    {item.answer}
                  </TableCell>
                  <TableCell
                    className={`border px-12 py-3 bg-zinc-100 ${
                      item.query
                        ? item.query.status === "OPEN"
                          ? "bg-red-200" // Open
                          : item.query.status === "RESOLVED"
                          ? "bg-green-200" // Resolved
                          : "bg-zinc-50" // Default (for other statuses or null query)
                        : "bg-zinc-50" // If query is null, red background
                    }`}
                  >
                    {item.query ? (
                      <ViewQueryModal
                        title={item.question}
                        description={item.query?.description}
                        status={item.query?.status}
                        createdAt={item.query?.createdAt}
                        updatedAt={item.query?.updatedAt}
                        queryId={item.query?.id}
                        refetch={refetch}
                      />
                    ) : (
                      <CreateQueryModal
                        title={item.question}
                        description={item.query?.description}
                        formDataId={item.id}
                        refetch={refetch}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
