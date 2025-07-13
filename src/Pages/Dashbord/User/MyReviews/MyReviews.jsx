import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import useAuth from "./../../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: myReviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user?.email}`);
      return res.data || [];
    },
    enabled: !!user?.email,
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myReviews", user?.email]);
      toast.success(" Review deleted successfully!");
    },
    onError: (err) => {
      toast.error("❌ Could not delete review. Try again.");
    },
  });

  const handleDelete = (id) => {
  
      deleteReviewMutation.mutate(id);
    
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-orange-500 mb-6 text-center">
        My Reviews ({myReviews.length})
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-600">Loading your reviews...</p>
      ) : isError ? (
        <p className="text-center text-red-600">
          Failed to load your reviews.
        </p>
      ) : myReviews.length === 0 ? (
        <p className="text-gray-600 text-center">
          You haven't posted any reviews yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {myReviews.map((review) => (
            <li
              key={review._id}
              className="p-4 border border-orange-100 rounded bg-orange-50 shadow-sm flex gap-4 items-start"
            >
              {/* User Photo */}
              <img
                src={review.userPhoto}
                alt="User"
                className="w-12 h-12 rounded-full object-cover border shadow"
              />

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-orange-600">{review.userName}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-800 mt-1">Reviews: {review.text}</p>
                {/* Meal ID (optional badge or use for fetch link) */}
                <div className="mt-2">
                  <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                    Meal ID: {review.mealId}
                  </span>
                </div>
              </div>

              {/* Delete Button */}
              <Button variant={"destructive"}
                onClick={() => handleDelete(review._id)}
                disabled={deleteReviewMutation.isLoading}
                className={`${
                  deleteReviewMutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {deleteReviewMutation.isLoading ? "Deleting..." : "Delete"}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReviews;
