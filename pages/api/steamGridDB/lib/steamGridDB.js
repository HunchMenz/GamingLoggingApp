import axios from "axios";

// Mongoose
import { connectToDatabase } from "../../../../utils/lib/db";

// Models
import Tokens from "../../../../model/Tokens";

async function getAccessToken() {
  /** NOTE: SteamGridDB doesn't have an expiring token system, so there's no need to generate new tokens at the moment... there's also no way to generate tokens at the moment. */
  const currentDateTime = new Date();
  let access_token;

  // Connect to DB
  const client = await connectToDatabase();
  // Try db
  try {
    const existingToken = await Tokens.findOne({
      name: "SteamGridDB_API",
      expires: { $lte: currentDateTime },
    }).select("accessToken -_id");

    // Assign existing access token to our token variable (if exists)
    access_token = existingToken?.accessToken;
  } catch (err) {
    // Error in forming connection to db!
    throw new Error({ message: "Error in reaching db", error: err });
  }

  return access_token;
}

async function sendRequest(endpoint, method, data) {
  const token = await getAccessToken();

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  let options;
  switch (method.toLowerCase()) {
    case "get":
      options = {
        url: `${process.env.STEAMGRID_HOST}${endpoint}${
          typeof data === "object" ? Object.values(data).join("/") : data + "/"
        }`,
        method: method,
        headers: headers,
      };
      break;

    default:
      throw new Error("Invalid request method!");
  }

  const res = await axios(options).catch((err) => console.log(err));

  return res.data;
}

export { sendRequest };
