from pathlib import Path
from dotenv import load_dotenv
import os
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env from backend/.env
load_dotenv(BASE_DIR / '.env')


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", None)

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = str(os.getenv("DEBUG", "False")).lower() == "true"
DEBUG = True

# ALLOWED_HOSTS = [
#     os.getenv("ALLOWED_DJANGO_APP_HOST", ""),
#     os.getenv("ALLOWED_NEXT_JS_APP_HOST", ""),
# ]

# CORS_ALLOWED_ORIGINS = [
#     # os.getenv("DJANGO_APP_HOST", ""),
#     os.getenv("NEXT_JS_APP_HOST", ""),
# ]

ALLOWED_HOSTS = ['*']

CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_METHODS = [
    'POST',
    'GET',
    'OPTIONS',
]

CORS_ALLOW_HEADERS = [
    'authorization',
    'content-type',
    'accept',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# For development
if DEBUG:
    CORS_ALLOWED_ORIGINS += [
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ]
    ALLOWED_HOSTS += [
        'localhost',
        '127.0.0.1'
    ]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api',
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]



ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# DATABASES = {}
# DATABASES = {
#         'default': {
#             'ENGINE': os.getenv("PROD_ENGINE", None),  
#             'NAME':     os.getenv("PROD_NAME", None),  
#             'USER':     os.getenv("PROD_USER", None),  
#             "PASSWORD": os.getenv("PROD_PASSWORD", None),
#             "HOST":     os.getenv("PROD_HOST", None),  
#             "PORT":     5432,                          
#         }
#     }

# Initialize the database with the local database URL
DATABASES = {
    'default': dj_database_url.config(
            conn_max_age=0,
            # ssl_require=True,
            default=os.getenv('LOCAL_DATABASE_URL')
    )
}

# If the environment is production, use the production database
if DEBUG:
    # You can optionally use dj_database_url if you have a DATABASE_URL
    if os.getenv('DATABASE_URL'):
        DATABASES['default'] = dj_database_url.config(
            conn_max_age=0,
            ssl_require=True,
            default=os.getenv('DATABASE_URL')
        )

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

API_SECRET_KEY = os.getenv("API_SECRET_KEY", None)

REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [],
    'DEFAULT_THROTTLE_RATES': {}
}

if not DEBUG:
    REST_FRAMEWORK['DEFAULT_THROTTLE_CLASSES'] = [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ]
    REST_FRAMEWORK['DEFAULT_THROTTLE_RATES'] = {
        'anon': '100/day',
        'user': '100/day'
    }

# AWS SES Settings
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", None)
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY", None)
AWS_SES_REGION = os.getenv("AWS_SES_REGION", None)

# Default email settings
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", None)
EMAIL_USE_TLS = True
EMAIL_BACKEND = os.getenv("EMAIL_BACKEND", None)
EMAIL_TIMEOUT = 30  # seconds
TO_EMAIL_ADDRESS = os.getenv("TO_EMAIL_ADDRESS")