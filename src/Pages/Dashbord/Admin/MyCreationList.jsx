import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "./../../../Hooks/useAuth";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import Loader from './../../Loader/Loader';

const MyList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch food items by user email
  const {
    data: myCreationList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/foods?email=${user?.email}`);
      console.log('data:', res.data);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/foods/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products", user?.email]);
      Swal.fire("Deleted!", "Product has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete product.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-600 dark:text-red-400 text-center mt-10">Error fetching data.</p>;

  return (
    <div className="overflow-x-auto p-4 bg-gray-50 dark:bg-gray-900 rounded transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-4 text-orange-600 dark:text-orange-400">
        Product List
      </h2>
      <table className="min-w-full border rounded shadow text-sm text-left bg-white dark:bg-gray-800 transition-colors duration-300">
        <thead className="bg-orange-500 dark:bg-orange-500 text-white">
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Cost</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Added By</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myCreationList.map((item) => (
            <tr
              key={item._id}
              className="border-t hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <td className="px-4 py-2">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded border dark:border-gray-600"
                />
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{item.productName}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{item.category}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">${item.price}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">${item.cost}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{item.quantity}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{item.addedBy?.name}</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{new Date(item.createdAt).toLocaleString()}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleUpdate(item._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors duration-200"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyList;
