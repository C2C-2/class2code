# Use Python as base image
FROM python:3.12

# Set working directory
WORKDIR /app

# Copy requirements.txt
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Verify installation of langchain-community
RUN pip show langchain-community

RUN pip install tiktoken

# Copy all other files
COPY . .

# Expose port
EXPOSE 5000

# Command to run the app
CMD ["python", "index.py"]