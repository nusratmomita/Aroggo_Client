import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UseAxiosSecureAPI from "../../../CustomHooks/UseAxiosSecureAPI";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ReTitleProvider } from "re-title";

const SalesReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const axiosApi = UseAxiosSecureAPI();

  // autoTable(jsPDF);

  const {
    data: sales = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["salesReport", startDate, endDate],
    queryFn: async () => {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const res = await axiosApi.get("/salesReport", {
        params,
      });
      return res.data;
    },
  });

  console.log(sales)

  const handleFilter = (e) => {
    e.preventDefault();
    refetch();
  };

  const formateDate = (isoString) => {
    const date = new Date(isoString);

    const options = {
      timeZone: "UTC",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    const tableRows = [];

    sales.forEach((sale, index) => {
      tableRows.push([
        index + 1,
        new Date(sale.date).toLocaleDateString(),
        sale.buyerEmail,
        sale.sellerEmails,
        sale.medicineNames,
        (sale.totalPrice / 100).toFixed(2),
      ]);
    });

    doc.text("Sales Report", 14, 15);

    doc.autoTable({
      head: [["#", "Date", "Buyer", "Seller", "Medicines", "Price"]],
      body: tableRows, // Build this above as you're doing now
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [8, 12, 59] },
    });

    doc.save("SalesReport.pdf");
    // console.log("autoTable:", typeof doc.autoTable);
  };

  
  // console.log(sales);

  return (
    <ReTitleProvider defaultTitle="Sales Report">
      <div className="p-6 mt-10">
        <h2 className="text-4xl font-bold mb-6 text-[#080c3b]">Sales Report</h2>

        {/* Date Filter */}
        <form
          onSubmit={handleFilter}
          className="flex flex-wrap gap-4 items-center mb-6"
        >
          <div>
            <label className="label text-xl">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered text-2xl"
            />
          </div>
          <div>
            <label className="label text-xl">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered text-2xl"
            />
          </div>
          <button
            type="submit"
            className="btn  bg-[#98A1BC] text-[#080c3b] text-2xl hover:bg-[#7f89a4]  mt-6"
          >
            Filter
          </button>
        </form>
        <button
          onClick={downloadAsPDF}
          className="btn btn-sm bg-[#080c3b] text-white mb-4"
        >
          Download as PDF
        </button>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : sales.length === 0 ? (
            <p className="text-gray-500">No sales found.</p>
          ) : (
            <table className="table table-zebra mt-20">
              <thead className="bg-[#DED3C4] text-[#080c3b] text-2xl font-semibold">
                <tr className="text-center">
                  <th>#</th>
                  <th>Date</th>
                  <th>Buyer Email</th>
                  <th>Seller Emails</th>
                  <th>Medicine Names</th>
                  <th>Total Price (৳)</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr
                    key={index}
                    className="hover text-2xl text-center text-[#080c3b]"
                  >
                    <th>{index + 1}</th>
                    <td className="whitespace-nowrap">{formateDate(sale.date)}</td>
                    <td>{sale.buyerEmail}</td>
                    <td>{sale.sellerEmails}</td>
                    <td>{sale.medicineNames}</td>
                    <td>{sale.totalPrice / 100}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </ReTitleProvider>
  );
};

export default SalesReport;
