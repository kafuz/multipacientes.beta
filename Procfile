release: python manage.py collectstatic --noinput
web: gunicorn Core.wsgi:application
