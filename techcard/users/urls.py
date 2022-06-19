from django.urls import path
from django.contrib.auth.views import (
    LoginView,
    LogoutView,
    PasswordChangeDoneView,
    PasswordChangeView,
    PasswordResetCompleteView,
    PasswordResetConfirmView,
    PasswordResetDoneView,
    PasswordResetView,
)

from .views import SignUp

app_name = "users"

urlpatterns = [
    path(
        "login/",
        LoginView.as_view(template_name="users/login.html"),
        name="login",
    ),
    path(
        "logout/",
        LogoutView.as_view(template_name="users/logout.html"),
        name="logout",
    ),
    path("signup/", SignUp.as_view(), name="signup"),
    path(
        "reset/done/",
        PasswordResetCompleteView.as_view(
            template_name="users" "/password_reset_complete.html"
        ),
        name="reset_complete",
    ),
    path(
        "reset/<uidb64>/<token>/",
        PasswordResetConfirmView.as_view(
            template_name="users" "/password_reset_confirm.html"
        ),
        name="reset_confirm",
    ),
    path(
        "password_reset/",
        PasswordResetView.as_view(
            template_name="" "users/password_reset_form.html"
        ),
        name="password_reset",
    ),
    path(
        "password_reset/done/",
        PasswordResetDoneView.as_view(
            template_name="" "users/password_reset_done.html"
        ),
        name="password_reset_done",
    ),
    path(
        "password_change/done/",
        PasswordChangeDoneView.as_view(
            template_name="" "users/password_change_done.html"
        ),
        name="password_change_done",
    ),
    path(
        "password_change/",
        PasswordChangeView.as_view(
            template_name="" "users/password_change_form.html"
        ),
        name="password_change",
    ),
]
