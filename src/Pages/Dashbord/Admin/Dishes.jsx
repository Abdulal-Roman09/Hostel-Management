import React from "react";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Loader from "./../../Loader/Loader";
import Swal from "sweetalert2";

const Dishes = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: allFoods = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dishes"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allFoods`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/allFoods/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dishes"]);
      Swal.fire("Deleted!", "The dish has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete the dish.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this dish?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53e3e",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-red-500 py-10 text-lg font-medium">
        ❌ Failed to fetch food data!
      </div>
    );

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-orange-600 mb-8">
        🍽️ All Food Dishes
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-orange-500 text-white">
            <tr className="text-left">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Cost</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Added By</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allFoods.map((food, index) => (
              <tr
                key={index}
                className="hover:bg-orange-50 border-b transition duration-300"
              >
                <td className="px-6 py-4 font-medium text-gray-700">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  <img
                    src={food.image}
                    alt={food.productName}
                    
                    className="w-12 h-12 rounded-md object-cover border"
                  />
                </td>
                <td className="px-6 py-4 text-gray-800 font-semibold">
                  {food.productName}
                </td>
                <td className="px-6 py-4 text-gray-600">{food.category}</td>
                <td className="px-6 py-4 text-green-600 font-medium">
                  ৳{food.price}
                </td>
                <td className="px-6 py-4 text-red-500 font-medium">
                  ৳{food.cost}
                </td>
                <td className="px-6 py-4 text-gray-700">{food.quantity}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={food.addedBy?.photo}
                      alt="user"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{food.addedBy?.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(food.createdAt).toLocaleDateString("en-BD", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-md text-xs font-medium">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-md text-xs font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dishes;
