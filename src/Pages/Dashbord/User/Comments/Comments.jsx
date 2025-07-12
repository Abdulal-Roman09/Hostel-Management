import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import useAuth from "./../../../../Hooks/useAuth";

const ReviewsSection = ({ mealId }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [reviewText, setReviewText] = useState("");

  // Fetch reviews for this meal
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews", mealId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/foods/${mealId}/comments`);
      console.log("Fetched reviews:", res.data);
      return res.data.comments || [];
    },
    enabled: !!mealId,
  });

  // Mutation to add review (two POSTs simultaneously)
  const addReviewMutation = useMutation({
    mutationFn: async (newReview) => {
      console.log("Posting review data:", newReview);
      const [res1, res2] = await Promise.all([
        axiosSecure.post(`/foods/${mealId}/comments`, newReview),
        axiosSecure.post(`/reviews`, newReview),
      ]);
      console.log("/foods response:", res1.data);
      console.log("/reviews response:", res2.data);
      return { res1: res1.data, res2: res2.data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", mealId]);
      setReviewText("");
    },
    onError: (error) => {
      console.error("Error posting review:", error.response?.data || error.message);
      alert("Review post করতে সমস্যা হয়েছে। দয়া করে পরে আবার চেষ্টা করুন।");
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newReview = {
      mealId: mealId,              // এখানে mealId দেয়া জরুরি
      text: reviewText.trim(),
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email || "",
      createdAt: new Date().toISOString(),
    };

    addReviewMutation.mutate(newReview);
  };

  return (
    <div className="mt-10 bg-white rounded-lg p-6 shadow max-w-4xl mx-auto">
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

      <h3 className="text-xl font-semibold mb-4 text-orange-400 text-center">
        Reviews : {reviews.length}
      </h3>

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
