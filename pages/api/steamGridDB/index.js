import { sendRequest } from "./lib/steamGridDB";

export default async function handler(req, res) {
  let reqData;
  switch (req.method) {
    // Process request on array of data
    case "POST":
      reqData = req.query;
      const { method, dataList } = JSON.parse(req.body);

      let dataRes;
      try {
        dataRes = dataList.map(async (data) => {
          return await sendRequest(reqData.endpoint, method, data);
        });
      } catch (err) {
        res.status(401).json({
          message: `Failed to execute query on [${reqData.endpoint}] endpoint of IGDB!`,
          error: err,
        });
        console.error(err.response.data);
        throw err;
      }

      //   Promise.all(dataRes).then((val) => console.log(val));

      let resolvedData = await Promise.all(dataRes);

      resolvedData = resolvedData.map((res) => res.data[0]);

      //   console.log(resolvedData);

      res.status(200).json({
        message: `Successfully executed query on [${reqData.endpoint}] endpoint of IGDB!`,
        data: resolvedData,
      });

      break;

    case "GET":
      reqData = req.query;

      try {
        const data = await sendRequest(reqData.endpoint, "GET");
        res.status(200).json({
          message: `Successfully executed query on [${reqData.endpoint}] endpoint of IGDB!`,
          data: data,
        });
      } catch (err) {
        res.status(401).json({
          message: `Failed to execute query on [${reqData.endpoint}] endpoint of IGDB!`,
          error: err,
        });
      }
      break;

    default:
      res.status(401).json({
        message: "Error in completing request: invalid request method.",
      });
      break;
  }
}
