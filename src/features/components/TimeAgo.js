import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

// parseISO = read the posted time
// formatDistanceToNow - to get posted time
const TimeAgo = ({ timeStamp }) => {
  let timeAgo = "";
  if (timeStamp) {
    const date = parseISO(timeStamp);
    const timePeroid = formatDistanceToNow(date);
    timeAgo = `${timePeroid} ago`;
  }
  return (
    <span className="user-timestamp" title={timeStamp}>
      &nbsp;<i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
