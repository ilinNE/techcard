FROM python:3.7-slim

WORKDIR /app
COPY requirements.txt /app
RUN pip3 install --upgrade pip
RUN pip3 install -r /app/requirements.txt --no-cache-dir
COPY techcard/ /app
CMD ["gunicorn", "techcard.wsgi:application", "--bind", "0:8000" ] 