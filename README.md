# 🚀 Level-Up Coaching

### Learn Better. Score Better. Build Your Future.

A modern and responsive coaching website designed for **CBSE students from Classes 6–12** with NCERT-based learning, question paper resources, bilingual support, student enquiry, and a secure teacher/admin dashboard.

---

## 🌐 Live Website

🔗 **Live Demo:**  
https://level-up-coaching-5a50sulfc-neeraj-dubeys-projects.vercel.app

---

## 📌 About The Project

**Level-Up Coaching** is a complete coaching website built to provide students with an organized digital learning experience.

The platform allows students to:

- Explore classes and subjects
- Learn about the coaching institute
- View teacher information
- Access question papers
- Search and filter question papers
- View and download PDF resources
- Submit admission enquiries
- Switch between English and Hindi

The website also includes a secure teacher/admin portal for managing question paper resources.

---

## ✨ Key Features

### 🎓 Student Features

- 📚 Classes 6–12 support
- 🧠 CBSE & NCERT-based learning
- 📄 Question paper portal
- 🔎 Search question papers
- 🎯 Class-wise filtering
- 📖 Subject-wise filtering
- 📝 Exam-type filtering
- 📅 Year-wise filtering
- 👀 View PDF
- ⬇️ Download PDF
- 📱 Fully responsive design
- 🌐 English / Hindi language support
- 💬 WhatsApp admission enquiry

---

### 🔐 Admin / Teacher Features

- 🔑 Secure teacher login
- 🛡️ Supabase Authentication
- 📊 Teacher dashboard
- 📤 Upload question papers
- 📄 PDF file management
- 🗑️ Delete question papers
- 🔍 Search and filter uploaded papers
- 📈 Dashboard statistics
- ⚡ Real-time question paper updates
- 🔒 Row Level Security (RLS)
- ☁️ Supabase Storage integration

---

## 🌐 Bilingual Support

The website supports two languages:

| Language   | Support |
| ---------- | ------- |
| 🇬🇧 English | ✅      |
| 🇮🇳 Hindi   | ✅      |

Users can switch languages directly from the navigation bar.

The selected language is stored locally so the preference can be maintained across page refreshes.

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      Students       │
                    │  Desktop / Mobile   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │                     │
                    │  React + Tailwind   │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
        ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
        │ Supabase    │ │  Supabase   │ │  Supabase   │
        │ Auth        │ │ PostgreSQL   │ │  Storage    │
        └─────────────┘ └─────────────┘ └─────────────┘
                │              │              │
                │              │              │
                └──────────────┼──────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Supabase Realtime   │
                    │                     │
                    │ Live Paper Updates  │
                    └─────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Vercel        │
                    │ Production Hosting   │
                    └─────────────────────┘
```
