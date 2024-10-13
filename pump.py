import subprocess
import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".", ".env")
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
else:
    raise FileNotFoundError(".env file not found")

cont_from = os.environ.get("CONTAINER_FROM")
cont_to = os.environ.get("CONTAINER_TO")
files_from = os.environ.get("COPY_FILES").split("*")
os.makedirs("copy", exist_ok=True)
print(cont_from)
for file in files_from:
    subprocess.call(f"docker cp {cont_from}:/{file} ./copy")
print(cont_to)
for file in files_from:
    subprocess.call(f"docker cp copy/{file.split('/')[-1]} {cont_to}:/var/app/copy/")
