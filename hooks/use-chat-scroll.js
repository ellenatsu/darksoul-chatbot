import { useEffect, useState } from "react";

// type ChatScrollProps = {
//   chatRef: React.RefObject<HTMLDivElement>;
//   bottomRef: React.RefObject<HTMLDivElement>;
//   shouldLoadMore: boolean;
//   loadMore: () => void;
//   count: number;
// };


export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}) => {
  const [hasInitialized, setHasInitialized] = useState(false);
 
  
  //user manually scroll up or down
  useEffect(() => {
    const topDiv = chatRef?.current;

    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop;

      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }

      // Check if user scrolled close to the bottom
      if (!topDiv) {
        return false;
      }


    };

    topDiv?.addEventListener("scroll", handleScroll);

    return () => {
      topDiv?.removeEventListener("scroll", handleScroll);
    };
  }, [shouldLoadMore, loadMore, chatRef]);

  //Auto-Scrolling to the Bottom
  useEffect(() => {
    const bottomDiv = bottomRef?.current;
    const topDiv = chatRef.current;
    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true);
        return true;
      }

      if (!topDiv) {
        return false;
      }

      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 100;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } 
  }, [bottomRef, chatRef, count, hasInitialized]);

};