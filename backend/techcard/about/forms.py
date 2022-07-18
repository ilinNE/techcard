from email import message
from django import forms

class MessageForm(forms.Form):
    name = forms.CharField(
        max_length=150,
        required=True
    )
    email = forms.EmailField()
    text_message = forms.CharField(
        max_length=2000,
        widget=forms.Textarea()
    )
