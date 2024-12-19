// Count total user messages from December 18th
db.production_03_12_14_30_mini.aggregate([
  {
    $match: {
      timestamp: {
        $gte: "2024-12-18T00:00:00.000Z",
        $lte: "2024-12-18T23:59:59.999Z"
      }
    }
  },
  {
    $project: {
      userMessages: {
        $size: {
          $filter: {
            input: "$messages",
            as: "message",
            cond: { $eq: ["$$message.role", "user"] }
          }
        }
      }
    }
  },
  {
    $group: {
      _id: null,
      total: { $sum: "$userMessages" }
    }
  }
]);
