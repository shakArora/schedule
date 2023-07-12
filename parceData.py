import xlrd
import json

workbook = xlrd.open_workbook("data.xlsx")
worksheet = workbook.sheet_by_index(0)

data = []

for i in range(1, worksheet.nrows):
    row = worksheet.row_values(i)
    date = row[0]
    day_type = row[1]
    comment = row[2]
    data.append({"date": date, "type": day_type, "comment": comment})

output = json.dumps(data, indent=2)

with open("days.json", "w") as file:
    file.write(output)

print("Data processed and saved to 'days.json'.")
