import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import UseAxiosSecureAPI from "../../../CustomHooks/UseAxiosSecureAPI";
import { motion } from "framer-motion";

const AdminHome = () => {
  const axiosSecure = UseAxiosSecureAPI();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["salesRevenue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/salesRevenue");
      return res.data;
    },
  });

  const total = data.Accepted + data.Pending;

  if (isLoading) return <div className="text-center font-semibold">Loading sales chart...</div>;

  // Transform data to array for recharts
  const chartData = [
    { name: "Paid", value: (data.Accepted/100) || 0 },
    { name: "Pending", value: (data.Pending/100) || 0 },
  ];

  const COLORS = ["#080c3b", "#555879"];

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3.5 }}>
        <div className="mt-40 w-full max-w-md mx-auto bg-white p-4 shadow-md rounded-md">
        <h2 className="text-4xl font-bold text-center text-[#080c3b] mb-4">Sales Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
            <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
                }
            >
                {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip 
                contentStyle={{fontSize:"20px", backgroundColor: "#f4f4f4", borderRadius: "8px", borderColor: "#ddd" }}
                formatter={(value) => [`৳${value}`, "Amount"]}
            />
            <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </ResponsiveContainer>
        </div>
        <p className="mt-5 text-center text-3xl text-gray-500">
            Total Revenue: <span className="font-semibold text-[#080c3b]">৳{total/100}</span>
        </p>
    </motion.div>
  );
};

export default AdminHome;
