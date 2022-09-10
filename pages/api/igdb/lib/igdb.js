import axios from "axios";

// Mongoose
import dbConnect from "../../../../utils/lib/dbConnect";

// Models
import Tokens from "../../../../model/Tokens";

async function getAccessToken() {
  const currentDateTime = new Date();
  let access_token;

  // Connect to DB
  await dbConnect("user_data");
  // Try db
  try {
    // Error in forming connection to db!
    const existingToken = await Tokens.findOne({
      name: "IGDB_API",
      expires: { $lte: currentDateTime },
    }).select("accessToken -_id");

    // Assign existing access token to our token variable (if exists)
    access_token = existingToken?.accessToken;
  } catch (err) {
    throw new Error({ message: "Error in reaching db", error: err });
  }

  // If we failed in getting an existing token...
  if (!access_token) {
    try {
      // perform generate token action
      const data = await generateToken();

      // assign data appropriately
      access_token = data.access_token;

      // build and save new token document
      const newToken = new Tokens({
        name: "IGDB_API",
        accessToken: access_token,
        expiresOn: currentDateTime.setSeconds(
          currentDateTime.getSeconds() + data.expires_in
        ),
      });
      newToken.save();
    } catch (err) {
      throw new Error({
        message: "Error in generating/saving token",
        error: err,
      });
    }
  }
  return access_token;
}

async function generateToken() {
  const options = {
    method: "post",
    url: process.env.TWITCH_HOST_TOKEN,
    params: {
      client_id: process.env.IGDB_CLIENT_ID,
      client_secret: process.env.IGDB_CLIENT_SECRET,
      grant_type: "client_credentials",
    },
  };

  // TODO: Add logging so we can monitor on db
  const retrieveToken = await axios(options).catch((err) => {
    throw err;
  });

  return retrieveToken.data;
}

async function sendRequest(endpoint, body) {
  const token = await getAccessToken();

  const headers = {
    "Client-ID": process.env.IGDB_CLIENT_ID,
    Authorization: `Bearer ${token}`,
  };

  const res = await axios({
    url: process.env.IGDB_HOST + endpoint,
    method: "POST",
    headers: headers,
    data: body,
  });

  return res.data;
}

export { sendRequest };
