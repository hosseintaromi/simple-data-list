import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data.json");

const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeDataToFile = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing data to file", error);
  }
};

export async function POST(req) {
  try {
    const newData = await req.json();
    const existingData = readDataFromFile();
    existingData.push(newData);

    writeDataToFile(existingData);

    return new Response(
      JSON.stringify({ message: "Data received and stored!" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error processing request" }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    const data = readDataFromFile();
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
    });
  }
}
