import { sendRequest } from "./lib/igdb";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { endpoint, query } = JSON.parse(req.body);

      try {
        const data = await sendRequest(endpoint, query);
        res.status(200).json({
          message: `Successfully executed query on [${endpoint}] endpoint of IGDB!`,
          data: data,
        });
      } catch (err) {
        res.status(401).json({
          message: `Failed to execute query on [${endpoint}] endpoint of IGDB!`,
          error: err,
        });
        break;
      }

      break;

    default:
      res.status(401).json({
        message: "Error in completing request: invalid request method.",
      });
      break;
  }
}
