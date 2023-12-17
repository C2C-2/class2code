import firebase_admin
from firebase_admin import credentials, storage

# Initialize Firebase
cred = credentials.Certificate(
    "./serviceAccountKey.json"
)  # Replace with your service account key file
firebase_admin.initialize_app(cred, {"storageBucket": "class2code.appspot.com"})

# Get a reference to the storage service
bucket = storage.bucket()

# # Upload a file
# file_path = "./file1.pdf"  # Replace with the path to your local file
# destination_blob_name = "file1.pdf"  # Replace with the desired path in Firebase Storage

# blob = bucket.blob(destination_blob_name)
# blob.upload_from_filename(file_path)

# print(f"File {file_path} uploaded to {destination_blob_name}")


# Specify the file to be downloaded
source_blob_name = "file1.pdf"  # Replace with the path to the file in Firebase Storage
local_file_path = "./file/file1.pdf"

# Download the file
blob = bucket.blob(source_blob_name)
blob.download_to_filename(local_file_path)
