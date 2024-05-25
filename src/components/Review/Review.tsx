import React, { useState } from "react";
import "./review.css";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

interface Comment {
  id: number;
  userId: number;
  fullname: string;
  createdAt: string;
  review: string;
}

interface ReviewProps {
  product_id: number;
}

const Review: React.FC<ReviewProps> = ({ product_id }) => {
  const dummyComments: Comment[] = [
    {
      id: 1,
      userId: 1,
      fullname: "John Doe",
      createdAt: "2024-05-23T12:00:00Z",
      review: "Great product! Highly recommend.",
    },
    {
      id: 2,
      userId: 2,
      fullname: "Jane Smith",
      createdAt: "2024-05-22T09:30:00Z",
      review: "Not bad, but could be better.",
    },
    {
      id: 3,
      userId: 1,
      fullname: "John Doe",
      createdAt: "2024-05-21T15:45:00Z",
      review: "Excellent quality for the price.",
    },
  ];

  const [comments, setComments] = useState<Comment[]>(dummyComments);
  const [newComment, setNewComment] = useState<string>("");
  const [userId, setUserId] = useState<number>(1);

  const handleComment = () => {
    alert("Comment added");
    const newCommentData: Comment = {
      id: comments.length + 1,
      userId: userId,
      fullname: "John Doe",
      createdAt: new Date().toISOString(),
      review: newComment,
    };
    setComments([...comments, newCommentData]);
    setNewComment("");
  };

  const handleDeleteComment = (commentId: number) => {
    alert("Comment deleted");
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const getTimeDifferenceString = (timestamp: string) => {
    const currentDate = new Date();
    const timestampDate = new Date(timestamp);
    const timeDifferenceMilliseconds = currentDate.getTime() - timestampDate.getTime();
    const timeDifferenceSeconds = Math.floor(timeDifferenceMilliseconds / 1000);
    const timeDifferenceMinutes = Math.floor(timeDifferenceSeconds / 60);
    const timeDifferenceHours = Math.floor(timeDifferenceMinutes / 60);
    const timeDifferenceDays = Math.floor(timeDifferenceHours / 24);

    if (timeDifferenceSeconds < 60) {
      return `${timeDifferenceSeconds} seconds ago`;
    } else if (timeDifferenceMinutes < 60) {
      return `${timeDifferenceMinutes} minutes ago`;
    } else if (timeDifferenceHours < 24) {
      return `${timeDifferenceHours} hours ago`;
    } else {
      return `${timeDifferenceDays} days ago`;
    }
  };

  return (
    <div className="commentContainer">
      <div className="addCommentTop">
        <h1>Add Review</h1>

        <div className="addComment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="addCommentContainer"
          />
          <button onClick={handleComment} className="addCommentBtn">
            Comment
          </button>
        </div>
      </div>

      <div className="AllComments">
        <h1>All Comments</h1>
      </div>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className="allCommentContainer" key={comment.id}>
            <div className="comment">
              <div className="commentHeader">
                <div className="commentHeaderUserDiv">
                  <div className="commentHeaderInfo">
                    <h1>{comment.fullname}</h1>
                  </div>
                  <div className="commentHeaderTime">
                    <p>{getTimeDifferenceString(comment.createdAt)}</p>
                  </div>
                </div>
                <div className="commentDelete">
                  {comment.userId === userId && (
                    <DeleteRoundedIcon
                      onClick={() => handleDeleteComment(comment.id)}
                      className="delBtn"
                    />
                  )}
                </div>
              </div>
              <h2>{comment.review}</h2>
            </div>
          </div>
        ))
      ) : (
        <p
          style={{
            color: "rgb(179 177 184)",
            marginLeft: "15px",
            fontSize: "14px",
          }}
        >
          No Comments
        </p>
      )}
    </div>
  );
};

export default Review;


