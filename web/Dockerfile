FROM python:3.8

ENV PYTHONUNBUFFERED 1

RUN mkdir /backend

WORKDIR /backend

COPY requirements.txt /backend

RUN  pip install --upgrade pip && pip install -r requirements.txt

CMD ./wait-for-it.sh  db:3306 --  python3 ./backend/manage.py runserver 0.0.0.0:8095