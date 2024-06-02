from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.embeddings import OpenAIEmbeddings
from dotenv import dotenv_values
from dotenv import load_dotenv
import os
from PyPDF2 import PdfReader
from langchain.chains.question_answering import load_qa_chain
from langchain_community.llms import OpenAI
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from flask_httpauth import HTTPBasicAuth
import firebase_admin
from firebase_admin import credentials, storage
from io import BytesIO
import redis

auth = HTTPBasicAuth()

# Load configuration from the .env file
load_dotenv()

# Access environment variables
username = os.getenv("AI_USERNAME")
password = os.getenv("AI_PASSWORD")

users = {
    username: password,
}


@auth.verify_password
def verify_password(username, password):
    if username in users and users[username] == password:
        return username


# Load the environment values
env_values = dotenv_values("./app.env")
os.environ["OPENAI_API_KEY"] = env_values["OPENAI_API_KEY"]

# Initialize OpenAI model
llm = OpenAI(model_name="gpt-3.5-turbo", temperature=0.5)
chain = load_qa_chain(llm)
embeddings = OpenAIEmbeddings()

# Initialize Flask and CORS
app = Flask(__name__)
CORS(app)


def readPdfFromBytes(file_bytes):
    reader = PdfReader(BytesIO(file_bytes))
    pdf_text = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            pdf_text += text
    return pdf_text


# text splitter
text_splitter = CharacterTextSplitter(
    separator="\n",
    chunk_size=1000,
    chunk_overlap=200,
    length_function=len,
)

# Initialize Firebase
cred = credentials.Certificate(
    "./serviceAccountKey.json"
)  # Replace with your service account key file
firebase_admin.initialize_app(cred, {"storageBucket": "class2code.appspot.com"})

# Get a reference to the storage service
bucket = storage.bucket()

print(os.getenv("REDIS_URL"))
# Initialize Redis
r = redis.Redis(
    host=os.getenv("REDIS_URL"),
    port=6379,
)


@app.route("/read_pdf", methods=["POST"])
@auth.login_required
def read_and_answer():
    filename = request.json.get("filename", "")
    file_url = "projects/" + filename

    # Check if the file is already in Redis
    file_bytes = r.get(filename)

    if file_bytes is None:
        # File not in Redis, download and store it
        file_url = "projects/" + filename
        blob = bucket.blob(file_url)
        file_bytes = blob.download_as_bytes()

        # Store the file_bytes in Redis with a time-to-live (TTL) of 1 hour (3600 seconds)
        r.setex(filename, 3600, file_bytes)

    # Read file in-memory and splitting
    pdf_text = readPdfFromBytes(file_bytes)
    text_chunks = text_splitter.split_text(pdf_text)

    # Convert text to embedding and create vectors
    pdf_embeddings = FAISS.from_texts(text_chunks, embeddings)

    query = request.json.get("query", "")
    # Use langchain to run QnA chain for extracting text
    docs = pdf_embeddings.similarity_search(query)
    answer = chain.run(input_documents=docs, question=query)

    # Return the answer
    return jsonify(answer)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)  # Run in debug mode for development
