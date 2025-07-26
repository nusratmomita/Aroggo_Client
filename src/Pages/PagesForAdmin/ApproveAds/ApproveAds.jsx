import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecureAPI from "../../../CustomHooks/UseAxiosSecureAPI";
import { toast } from "react-toastify";

const ApproveAds = () => {
  const axiosSecure = UseAxiosSecureAPI();
  const queryClient = useQueryClient();

  // Fetch ads using TanStack Query
  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allAds");
      return res.data;
    },
  });

  // Mutation to toggle ad status
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, show }) => {
      return await axiosSecure.patch(`/allAds/${id}`, { show });
    },
    onSuccess: () => {
      toast.success("Ad status updated");
      queryClient.invalidateQueries(["ads"]);
    },
    onError: () => {
      toast.error("Failed to update ad status");
    },
  });

  const handleToggleStatus = (id, currentStatus) => {
    const show = currentStatus !== "Approved"; // If not approved, we want to approve
    toggleStatusMutation.mutate({ id, show });
  };

   // Format ISO date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      timeZone: "UTC",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };


  if (isLoading) {
    return <div className="text-center text-xl text-[#080c3b] font-bold">Loading ads...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-[#080c3b] mb-8">Manage Advertised Medicines</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ads.map((ad) => (
          <div
            key={ad._id}
            className="border shadow-md rounded-xl overflow-hidden bg-white"
          >
            <img
              src={ad.image}
              alt={ad.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-2xl font-semibold text-[#080c3b]">Medicine Name: {ad.itemName}</h3>
              <p className="text-2xl text-[#555879]">Discounted Price: ৳{(ad.previousPrice*(ad.discount/100)).toFixed(2)}</p>
              <h3 className="text-sm font-semibold text-[#080c3b]">Requested At: {formatDate(ad.requestedAt)}</h3>
              <p className="text-sm font-medium text-gray-500">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    ad.status === "Approved" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {ad.status}
                </span>
              </p>

              <button
                onClick={() => handleToggleStatus(ad._id, ad.status)}
                disabled={toggleStatusMutation.isLoading}
                className={`cursor-pointer w-full mt-4 px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300 ${
                  ad.status === "Approved"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {ad.status === "Approved" ? "Remove from Slide" : "Add to Slide"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApproveAds;
