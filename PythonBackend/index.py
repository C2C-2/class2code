from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from dotenv import load_dotenv, dotenv_values
from PyPDF2 import PdfReader
import firebase_admin
from firebase_admin import credentials, storage
from io import BytesIO
import os
import redis

# Load environment variables
load_dotenv()
env_values = dotenv_values("./app.env")
os.environ["OPENAI_API_KEY"] = env_values["OPENAI_API_KEY"]
username = os.getenv("AI_USERNAME")
password = os.getenv("AI_PASSWORD")
redis_url = os.getenv("REDIS_URL")

users = {username: password}

# Initialize authentication
auth = HTTPBasicAuth()


@auth.verify_password
def verify_password(username, password):
    return users.get(username) == password


# Initialize services
def initialize_services():
    cred = credentials.Certificate("./serviceAccountKey.json")
    firebase_admin.initialize_app(cred, {"storageBucket": "class2code.appspot.com"})
    return storage.bucket(), redis.Redis(host=redis_url, port=6379)


bucket, r = initialize_services()

# Initialize OpenAI model
llm = OpenAI(model_name="gpt-4", temperature=0.5)
chain = load_qa_chain(llm)
embeddings = OpenAIEmbeddings()

# Initialize Flask and CORS
app = Flask(__name__)
CORS(app)


def read_pdf_from_bytes(file_bytes):
    pdf_text = ""
    try:
        reader = PdfReader(BytesIO(file_bytes))
        for page in reader.pages:
            text = page.extract_text()
            if text:
                pdf_text += text
    except Exception as e:
        print(f"Error reading PDF: {e}")
    return pdf_text


text_splitter = CharacterTextSplitter(
    separator="\n", chunk_size=1000, chunk_overlap=200
)


@app.route("/read_pdf", methods=["POST"])
@auth.login_required
def read_and_answer():
    filename = request.json.get("filename", "")
    query = request.json.get("query", "")

    if not filename or not query:
        return jsonify({"error": "Filename and query are required"}), 400

    file_bytes = r.get(filename)
    if file_bytes is None:
        blob = bucket.blob(f"projects/{filename}")
        file_bytes = blob.download_as_bytes()
        r.setex(filename, 3600, file_bytes)

    pdf_text = read_pdf_from_bytes(file_bytes)
    text_chunks = text_splitter.split_text(pdf_text)
    pdf_embeddings = FAISS.from_texts(text_chunks, embeddings)
    docs = pdf_embeddings.similarity_search(query)
    answer = chain.run(input_documents=docs, question=query)

    return jsonify(answer)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
