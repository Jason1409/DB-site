import os
import smtplib
from email.mime.text import MIMEText
from app.models.contacts import ContactForm
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
EMAIL_FROM = os.getenv("EMAIL_FROM")
EMAIL_TO = os.getenv("EMAIL_TO","")

def send_contact_email(contact: ContactForm):
    subject = f"📩 New Contact Form Submission from {contact.name}"
    body = f"""
You have received a new contact form submission:

Name: {contact.name}
Email: {contact.email}
Phone: {contact.phone}
Message:
{contact.message}
"""
    recipients = [email.strip() for email in EMAIL_TO.split(",") if email.strip()]


    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = EMAIL_FROM
    msg["To"] = ", ".join(recipients)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_USERNAME, EMAIL_PASSWORD)
        server.sendmail(EMAIL_FROM, EMAIL_TO, msg.as_string())
