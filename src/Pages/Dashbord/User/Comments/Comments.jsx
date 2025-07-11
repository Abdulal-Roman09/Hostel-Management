import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import useAuth from "./../../../../Hooks/useAuth";

const CommentsSection = ({ mealId }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [commentText, setCommentText] = useState("");

  // Fetch comments for the meal
  const {
    data: comments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["comments", mealId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/foods/${mealId}/comments`);
      return res.data.data || [];
    },
    enabled: !!mealId,
  });

  // Mutation to add new comment
  const addCommentMutation = useMutation({
    mutationFn: async (newComment) => {
      return await axiosSecure.post(`/foods/${mealId}/comments`, newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", mealId]);
      setCommentText("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      text: commentText,
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email || "",
      createdAt: new Date().toISOString(),
    };

    addCommentMutation.mutate(newComment);
  };

  return (
    <div className="mt-10 bg-white rounded-lg p-6 shadow max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          rows={3}
          className="w-full border rounded p-3 resize-none focus:outline-orange-500"
          placeholder="Write your comment here..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={addCommentMutation.isLoading}
          className="mt-2 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
        >
          {addCommentMutation.isLoading ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <p>Loading comments...</p>
      ) : isError ? (
        <p className="text-red-600">Failed to load comments.</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-600">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment._id || comment.createdAt}
              className="border rounded p-4 bg-orange-50"
            >
              <p className="font-semibold">{comment.userName || "Anonymous"}</p>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsSection;
