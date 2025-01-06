import React from "react";

const CommentSection = ({ comments }) => {
 return (
  <div className="w-full bg-white p-5 rounded-lg shadow-md" id="comments">
   <p className="text-xl mb-4 font-abril-fatface border-b-2 pb-2">Comments</p>

   <div className="space-y-4">
    {comments &&
     comments.map((e) => (
      <Comment author={e.user.first_name} text={e.comment.comment_text} />
     ))}
   </div>
  </div>
 );
};

const Comment = ({ author, text }) => {
 return (
  <div className="flex space-x-4">
   <div className="flex-shrink-0">
    <img
     src="https://via.placeholder.com/40"
     alt={`${author}'s Profile`}
     className="w-10 h-10 rounded-full"
    />
   </div>
   <div className="flex-grow">
    <p className="font-semibold">{author}</p>
    <p className="text-gray-600">{text}</p>
   </div>
  </div>
 );
};

export default CommentSection;
