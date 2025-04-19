import fs from "fs";
import path from "path";
export const downloadUserExcel = (req, res) => {
  const filePath = path.join("exports", "users.xlsx");

  if (fs.existsSync(filePath)) {
    res.download(filePath, "users.xlsx", (err) => {
      if (err) {
        console.error("Error in download:", err);
        return res.status(500).send("Error in downloading the file");
      }
    });
  } else {
    return res.status(404).send("File not found");
  }
};
