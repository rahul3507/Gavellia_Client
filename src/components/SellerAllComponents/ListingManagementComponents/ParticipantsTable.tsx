import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Participant } from "@/types/allTypes";

interface ParticipantsTableProps {
  participants: Participant[];
}

const ParticipantsTable = ({ participants }: ParticipantsTableProps) => {
  return (
    <div className="p-5 sm:p-8">
      {/* Table Header */}
      <div className="grid grid-cols-3 gap-4 pb-3 border-b border-gray-200 mb-2">
        <span className="text-sm font-semibold text-primary">
          Participants ({participants.length})
        </span>
        <span className="text-sm font-semibold text-primary">Bids</span>
        <span className="text-sm font-semibold text-primary text-right">
          Action
        </span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100">
        {participants.map((participant, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 items-center py-4">
            {/* Name + Avatar */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                <Image
                  src={participant.avatar}
                  alt={participant.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-primary truncate">
                {participant.name}
              </span>
            </div>

            {/* Bid */}
            <span className="text-sm text-primary">
              £ {participant.bid.toLocaleString()}
            </span>

            {/* Action */}
            <div className="flex justify-end">
              <Button
                className={`text-xs font-semibold px-4 py-2 rounded-sm cursor-pointer ${
                  index === 0
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-gray-200 text-muted-foreground hover:bg-gray-300"
                }`}
              >
                DECLARE WINNER
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsTable;
