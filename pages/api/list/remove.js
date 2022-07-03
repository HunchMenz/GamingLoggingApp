// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// TODO: Write API that deletes game from a users game list
export default function handler(req, res) {
  // use array.filter(gameID) to remove specific id from array
  res.status(200).json({ name: "John Doe" });
}
