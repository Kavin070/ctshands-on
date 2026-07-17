# ==============================
# TASK 1
# ==============================

# 1. Request-Response Cycle
#
# Browser
#    |
#    | GET /api/courses/
#    v
# URL Router (urls.py)
#    |
#    v
# View (views.py)
#    |
#    v
# Model (models.py)
#    |
# Database Query
#    |
#    v
# View receives data
#    |
#    v
# HttpResponse / JSON Response
#    |
#    v
# Browser


# -----------------------------------
# 2. Middleware
# -----------------------------------

# Middleware sits between the incoming request
# and the view. It can process requests before
# they reach the view and process responses
# before they are returned.

# Built-in Middleware Examples

# 1. SecurityMiddleware
# Adds security-related HTTP headers.

# 2. AuthenticationMiddleware
# Identifies the logged-in user using sessions.


# -----------------------------------
# 3. WSGI vs ASGI
# -----------------------------------

# WSGI
# - Web Server Gateway Interface
# - Handles synchronous applications.
# - Used by Django by default.

# ASGI
# - Asynchronous Server Gateway Interface
# - Supports async programming.
# - Used for WebSockets, Chat apps,
#   Real-time notifications.

# Django uses WSGI by default.
# Switch to ASGI when building
# asynchronous or real-time applications.


# -----------------------------------
# 4. MVC vs MVT
# -----------------------------------

# MVC

# Model      -> Database
# View       -> User Interface
# Controller -> Business Logic

# Django MVT

# Model    -> Model
# View     -> Controller
# Template -> View (UI)