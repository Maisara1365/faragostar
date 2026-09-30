<?php

/*
|--------------------------------------------------------------------------
| Message Routes
|--------------------------------------------------------------------------
|
| Message routes are registered in the role-specific API route files.
|
| Admin:
|   routes/api/admin.php
|
| Content Manager:
|   routes/api/content-manager.php
|
| Customer:
|   routes/api/customer.php
|
| This file intentionally contains no generic authenticated message
| routes because message permissions differ between the three roles.
|
|--------------------------------------------------------------------------
|
| Permission structure:
|
| Admin
|   - View messages in any conversation
|   - Send messages
|   - Update own messages
|   - Mark messages as seen
|   - Delete own attachments
|
| Content Manager
|   - View messages in customer conversations
|   - Send/reply to messages
|   - Mark messages as seen
|   - No conversation creation
|   - No conversation assignment
|   - No open/close management
|
| Customer
|   - View messages in own conversations
|   - Send messages
|   - Update own messages
|   - Mark messages as seen
|   - Delete own attachments
|
|--------------------------------------------------------------------------
|
| Future notifications:
|
| Message activity will later provide the source for notifications.
| For example:
|
| Customer sends message
|       ↓
| Admin / Content Manager notification
|
| Admin or Content Manager sends message
|       ↓
| Customer notification
|
| The notification page/API will be implemented after the messaging
| permission structure is complete.
|
|--------------------------------------------------------------------------
*/