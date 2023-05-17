import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json

# service account mail:  moneycarapp@moneycars.iam.gserviceaccount.com 
# unique id:  111796286199489345933 
# Set up Google Sheets credentials
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name("/Users/maya/ET_RL/moneycars-cd391c603cc3.json", scope)
client = gspread.authorize(credentials)

# Open the Google Sheet
sheet = client.open("subjects_info").sheet1

# Get the values from the "WorkerId" column
worker_ids = sheet.col_values(1)

# Iterate over the WorkerIds and update the corresponding columns
for row_index, worker_id in enumerate(worker_ids[1:], start=2):  # Start from row 2 (skip header row)
    # Check if WorkerId exists
    if worker_id:
        # Open the JSON file
        filename = f"results({row_index - 10}).json"
        with open(filename, "r") as json_file:
            data = json.load(json_file)
            
            # Check if "doneTest2" exists and has a value of "doneTest2"
            if "doneTest2" in data and data["doneTest2"] == "doneTest2":
                # Update "isExperimentDone?" column to 1
                sheet.update_cell(row_index, 2, "1")
                
                # Check if "totalBlues" and "totalReds" exist and are not empty
                if "totalBlues" in data and data["totalBlues"]:
                    total_blues = int(data["totalBlues"])
                else:
                    total_blues = 0

                if "totalReds" in data and data["totalReds"]:
                    total_reds = int(data["totalReds"])
                else:
                    total_reds = 0

                # Update "totalWins" column with the sum of "totalBlues" and "totalReds"
                sheet.update_cell(row_index, 3, str(total_blues + total_reds))
