import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json

# service account mail:  moneycarapp@moneycars.iam.gserviceaccount.com
# unique id:  111796286199489345933
# Set up Google Sheets credentials
scope = ["https://spreadsheets.google.com/feeds",
         "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name(
    "/Users/maya/ET_RL/moneycars-cd391c603cc3.json", scope)
client = gspread.authorize(credentials)

# Open the Google Sheet
sheet = client.open("subjects_info").sheet1
# Create a list to store batch update requests
batch_update = []
# Get the values from the "WorkerId" column
worker_ids = sheet.col_values(1)

# Iterate over the WorkerIds and update the corresponding columns
# Start from row 2 (skip header row)
for row_index, worker_id in enumerate(worker_ids[1:], start=2):
    # Check if WorkerId exists
    if worker_id:
        # Open the JSON file
        filename = f"/Users/maya/ET_RL/results({(10)}).json"
        with open(filename, "r") as json_file:
            # data = json.load(json_file)
            data_list = json.load(json_file)

            for data in data_list:
                # Check if "worker_id" and "doneTest2" match the condition
                if data.get("worker_id") == worker_id and data.get("doneTest2") == "doneTest2":
                    # Update "isExperimentDone?" column to 1
                    batch_update.append({
                        'range': f'E{row_index}',
                        'values': [['1']]
                    })
                    # Check if "totalBlues" and "totalReds" exist and are not empty
                    if "totalBlues" in data and data["totalBlues"]:
                        total_blues = int(data["totalBlues"])
                    else:
                        total_blues = 0

                    if "totalReds" in data and data["totalReds"]:
                        total_reds = int(data["totalReds"])
                    else:
                        total_reds = 0
                    # Calculate the sum of "totalBlues" and "totalReds"
                    total_wins = total_blues + total_reds
                    # Update "totalWins" column
                    batch_update.append({
                        'range': f'F{row_index}',
                        'values': [[str(total_wins)]]
                    })
# Perform the batch update
if batch_update:
    sheet.batch_update({'requests': [{'updateCells': {'rows': batch_update}}]})
