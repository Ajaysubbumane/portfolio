# EMAIL SETUP INSTRUCTIONS FOR GMAIL

To enable email notifications for contact form submissions, follow these steps:

## Step 1: Enable 2-Factor Authentication on Gmail
1. Go to myaccount.google.com
2. Click "Security" on the left panel
3. Scroll down to "2-Step Verification" and enable it
4. Complete the verification process

## Step 2: Generate Gmail App Password
1. Go to myaccount.google.com
2. Click "Security" on the left panel
3. Scroll down to "App passwords" (only visible if 2FA is enabled)
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Copy this password

## Step 3: Update .env File
In backend/.env file, replace:
```
MAIL_PASSWORD=your_gmail_app_password
```

With the 16-character password you just copied from Google (no spaces).

Example:
```
MAIL_PASSWORD=abcd efgh ijkl mnop
```
becomes:
```
MAIL_PASSWORD=abcdefghijklmnop
```

## Step 4: Restart the Backend Server
After updating .env, restart the Flask backend for changes to take effect.

## Testing
Try submitting a test message through the contact form. You should receive:
1. An email at ajaydevadiga600@gmail.com with the contact details
2. A confirmation email to the sender's address

## Troubleshooting
- Make sure 2-Factor Authentication is enabled on your Google account
- Ensure the app password is exactly 16 characters
- Check that MAIL_PASSWORD in .env has no extra spaces
- Restart the backend server after updating .env
- Check Flask console for error messages if emails don't send
