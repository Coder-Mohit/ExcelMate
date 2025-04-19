import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

export const dataSaveExcel = async (name, email, city) => {
  const dirPath = "exports";
  const filePath = path.join(dirPath, "users.xlsx");

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

  const workbook = new ExcelJS.Workbook();
  let worksheet;

  if (fs.existsSync(filePath)) {
    await workbook.xlsx.readFile(filePath);
    worksheet = workbook.getWorksheet("Users");
    if (!worksheet) {
      worksheet = workbook.addWorksheet("Users");
    }
  } else {
    worksheet = workbook.addWorksheet("Users");
  }

  worksheet.columns = [
    { header: "Name", key: "name", width: 25 },
    { header: "Email", key: "email", width: 30 },
    { header: "City", key: "city", width: 40 },
  ];

  const row = worksheet.addRow({ name, email, city });
  row.commit();

  await workbook.xlsx.writeFile(filePath);
};
