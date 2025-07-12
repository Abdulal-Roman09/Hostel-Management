import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import useAuth from "./../../../../Hooks/useAuth";

const ReviewsSection = ({ mealId }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [reviewText, setReviewText] = useState("");

  // Fetch reviews for the meal
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews", mealId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/foods/${mealId}/comments`); // backend still `/comments`
      console.log(res.data);
      return res.data.comments || [];
    },
    enabled: !!mealId,
  });

  // Mutation to add new review
  const addReviewMutation = useMutation({
    mutationFn: async (newReview) => {
      return await axiosSecure.post(`/foods/${mealId}/comments`, newReview); // backend still `/comments`
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", mealId]);
      setReviewText("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newReview = {
      text: reviewText,
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email || "",
      createdAt: new Date().toISOString(),
    };

    addReviewMutation.mutate(newReview);
  };

  return (
    <div className="mt-10 bg-white rounded-lg p-6 shadow max-w-4xl mx-auto">
      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          rows={3}
          className="w-full border rounded p-3 resize-none focus:outline-orange-500"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={addReviewMutation.isLoading}
          className="mt-2 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
        >
          {addReviewMutation.isLoading ? "Posting..." : "Post Review"}
        </button>
      </form>
      <div className="border-1 border-amber-100 "></div>
      <h3 className="text-xl font-semibold mb-4 text-orange-400 text-center">
        Reviews : {reviews.length}
      </h3>

      {/* Reviews List */}
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : isError ? (
        <p className="text-red-600">Failed to load reviews.</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review._id || review.createdAt}
              className="border rounded p-4 bg-orange-50"
            >
              <p className="font-semibold">{review.userName || "Anonymous"}</p>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(review.createdAt).toLocaleString()}
              </p>
              <p>{review.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewsSection;
