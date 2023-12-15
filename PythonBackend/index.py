from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.embeddings.openai import OpenAIEmbeddings
from dotenv import dotenv_values
import os
from PyPDF2 import PdfReader
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from flask_httpauth import HTTPBasicAuth

auth = HTTPBasicAuth()

users = {
    "QA2!eR23c": "yu23M@1R!f",
}


@auth.verify_password
def verify_password(username, password):
    if username in users and users[username] == password:
        return username


# Load the environment values
env_values = dotenv_values("./app.env")
os.environ["OPENAI_API_KEY"] = env_values["OPENAI_API_KEY"]

# Assuming you have a module `llm` defined, and a function `load_qa_chain` that uses this `llm`
llm = OpenAI(model_name="text-davinci-003", temperature=0.5)
chain = load_qa_chain(llm)
embeddings = OpenAIEmbeddings()

# Initialize Flask and CORS
app = Flask(__name__)
CORS(app)


def readPdf(fileName):
    reader = PdfReader(fileName)
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


@app.route("/read_pdf", methods=["POST"])
@auth.login_required
def read_and_answer():
    # Retrieve path or file from the request
    file_path = "files/file1.pdf"
    query = request.json.get("query", "")

    # Read file and splitting
    pdf_text = readPdf(file_path)
    text_chunks = text_splitter.split_text(pdf_text)

    # Convert text to embedding and create vectors
    pdf_embeddings = FAISS.from_texts(text_chunks, embeddings)

    # Use langchain to run QnA chain for extracting text
    docs = pdf_embeddings.similarity_search(query)
    answer = chain.run(input_documents=docs, question=query)

    # Return the answer
    return jsonify(answer)


if __name__ == "__main__":
    app.run(debug=True)  # Run in debug mode for development
