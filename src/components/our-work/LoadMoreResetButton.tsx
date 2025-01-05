import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface LoadMoreResetButtonProps {
  onClick: () => void;
  loading: boolean;
  isLoadMore: boolean;
  category: string;
}

export default function LoadMoreResetButton({
  onClick,
  loading,
  isLoadMore,
  category,
}: LoadMoreResetButtonProps) {
  return (
    <div className="flex justify-center mt-8 mb-12">
      <Button
        onClick={onClick}
        disabled={loading}
        className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        aria-label={
          loading
            ? "Loading more images"
            : isLoadMore
            ? "Load more images"
            : `Close ${category} gallery`
        }
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading...
          </>
        ) : isLoadMore ? (
          "Load More"
        ) : (
          `Close ${category} gallery`
        )}
      </Button>
    </div>
  );
}
