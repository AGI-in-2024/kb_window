Launch the RAGFlow Service from Source
A guide explaining how to set up a RAGFlow service from its source code. By following this guide, you'll be able to debug using the source code.

Target Audience
Developers who have added new features or modified existing code and wish to debug using the source code, provided that their machine has the target deployment environment set up.

Prerequisites
CPU ≥ 4 cores
RAM ≥ 16 GB
Disk ≥ 50 GB
Docker ≥ 24.0.0 & Docker Compose ≥ v2.26.1
NOTE
If you have not installed Docker on your local machine (Windows, Mac, or Linux), see the Install Docker Engine guide.

Launch the Service from Source
To launch the RAGFlow service from source code:

Clone the RAGFlow Repository
git clone https://github.com/infiniflow/ragflow.git
cd ragflow/

Install Python dependencies
Install Poetry:

curl -sSL https://install.python-poetry.org | python3 -

Configure Poetry:

export POETRY_VIRTUALENVS_CREATE=true POETRY_VIRTUALENVS_IN_PROJECT=true

Install Python dependencies:

~/.local/bin/poetry install --sync --no-root

A virtual environment named .venv is created, and all Python dependencies are installed into the new environment.

Launch Third-party Services
The following command launches the 'base' services (MinIO, Elasticsearch, Redis, and MySQL) using Docker Compose:

docker compose -f docker/docker-compose-base.yml up -d

Update host and port Settings for Third-party Services
Add the following line to /etc/hosts to resolve all hosts specified in docker/service_conf.yaml.template to 127.0.0.1:

127.0.0.1       es01 infinity mysql minio redis

In docker/service_conf.yaml.template, update mysql port to 5455 and es port to 1200, as specified in docker/.env.

Launch the RAGFlow Backend Service
Comment out the nginx line in docker/entrypoint.sh.

# /usr/sbin/nginx

Activate the Python virtual environment:

source .venv/bin/activate
export PYTHONPATH=$(pwd)

Optional: If you cannot access HuggingFace, set the HF_ENDPOINT environment variable to use a mirror site:

export HF_ENDPOINT=https://hf-mirror.com

Run the entrypoint.sh script to launch the backend service:

bash docker/entrypoint.sh

Launch the RAGFlow frontend service
Navigate to the web directory and install the frontend dependencies:

cd web
npm install --force

Update proxy.target in .umirc.ts to http://127.0.0.1:9380:

vim .umirc.ts

Start up the RAGFlow frontend service:

npm run dev 

The following message appears, showing the IP address and port number of your frontend service:



Access the RAGFlow service
In your web browser, enter http://127.0.0.1:<PORT>/, ensuring the port number matches that shown in the screenshot above.

Stop the RAGFlow service when the development is done
Stop the RAGFlow frontend service:

pkill npm

Stop the RAGFlow backend service:

pkill -f "docker/entrypoint.sh"