import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    navbar: {
      home: "Home",
      about: "About",
      teachers: "Teachers",
      subjects: "Subjects",
      classes: "Classes",
      questionPapers: "Question Papers",
      contact: "Contact",
      admission: "Admission Enquiry",
    },

    hero: {
      badge: "Classes 6–12 • CBSE • NCERT Based",
      title1: "Learn Better.",
      title2: "Score Better.",
      title3: "Build Your Future.",
      description:
        "Personalized coaching for Classes 6–12 with focused learning, regular tests, doubt solving and exam preparation.",
      admission: "Admission Enquiry",
      papers: "View Question Papers",
      classes: "Classes",
      board: "Board",
      learning: "Learning",
      cardTitle: "Learn. Practice. Improve.",
      cardDescription:
        "A focused learning environment designed to help students understand concepts, revise effectively, and improve their academic performance.",
      classes610: "Classes 6–10",
      foundation: "Strong foundation & school preparation",
      classes1112: "Classes 11–12",
      scienceStream: "Science stream focused learning",
      regularPractice: "Regular Practice",
      conceptFocused: "✓ Concept Focused",
    },

    about: {
      smallTitle: "About Level-Up Coaching",
      title: "Learn Better.",
      title2: "Grow Stronger.",
      description:
        "Level-Up Coaching provides structured learning and academic guidance for CBSE students from Classes 6 to 12, following the NCERT curriculum and focusing on clear concepts, regular practice, and continuous improvement.",
      focusedTitle: "Focused Learning Environment",
      focusedDescription:
        "Our goal is not only to complete the syllabus, but also to help students understand concepts clearly, practice consistently, and improve their academic performance.",
      structuredStudy: "Structured Study",
      regularPractice: "Regular Practice",
      doubtSupport: "Doubt Support",
      feature1Title: "NCERT Based Learning",
      feature1Text:
        "Students learn concepts according to the NCERT curriculum with a clear and structured approach.",
      feature2Title: "Concept Clarity",
      feature2Text:
        "Difficult topics are explained through simple examples and practical explanations.",
      feature3Title: "Regular Practice",
      feature3Text:
        "Regular questions, revision, and practice sessions help students improve their preparation.",
      feature4Title: "Doubt Solving",
      feature4Text:
        "Students receive proper guidance and support to clarify their doubts.",
      ourApproach: "Our Approach:",
      approachSteps: "Concept → Practice → Revision → Improvement",
    },

    teacher: {
      smallTitle: "Meet Our Teacher",
      titlePrefix: "Learn From",
      titleHighlight: "Experienced",
      titleSuffix: "Teachers",
      description:
        "Get guidance from dedicated teachers who focus on concept clarity, regular practice, and student development.",
      name: "Suraj Dubey",
      subject: "Mathematics & Science",
      qualification: "Diploma / B.A.",
      classes: "Classes 6–12",
      experience: "5+ Years Experience",
      teacherBadge: "Teacher",
      experienceLabel: "Experience",
      learningGuide: "Your Learning Guide",
      qualificationLabel: "Qualification",
      classesLabel: "Classes",
      teachingStyle: "Teaching Style",
      teachingStyleValue: "Concept Clarity • Practice • Doubt Solving",
      boardFocus: "Board Focus",
      subjectsTitle: "Subjects I Teach",
      subjectCount: "Subjects",
      mathematics: "Mathematics",
      science: "Science",
      physics: "Physics",
      chemistry: "Chemistry",
      basics: "Basic Concepts",
      exam: "Exam Preparation",
      goalTitle: "My Teaching Goal",
      goalText:
        "To make learning simple, interesting, and effective so that every student can improve their understanding and academic performance.",
      conceptClarity: "Concept Clarity",
      conceptClarityText: "Strong foundation in basics",
      studentSupport: "Student Support",
      studentSupportText: "Personal attention to students",
      betterLearning: "Better Learning",
      betterLearningText: "Regular practice and revision",
      quote: "Let's build a brighter future together.",
    },

    whyChoose: {
      smallTitle: "Why Choose Us",
      titlePrefix: "Building Strong",
      titleHighlight: "Academic Foundations",
      description:
        "We provide a structured learning environment focused on subject understanding, consistent practice, and continuous academic improvement.",
      learningTitle: "Learning That",
      learningHighlight: "Moves You Forward",
      learningDescription:
        "Our approach is based on understanding concepts clearly, practicing regularly, and improving student preparation step by step.",
      understand: "Understand",
      understandText: "Understand concepts clearly.",
      practice: "Practice",
      practiceText: "Solve questions regularly.",
      improve: "Improve",
      improveText: "Improve performance through revision.",
      cbse: "CBSE Focused",
      cbseDescription: "CBSE Board focused preparation",
      ncert: "NCERT Based",
      ncertDescription: "NCERT curriculum based teaching",
      classes: "Classes 6–12",
      classesDescription: "Complete coverage from Classes 6 to 12",
      tests: "Regular Tests",
      testsDescription: "Regular tests and revision",
      doubts: "Doubt Solving",
      doubtsDescription: "Dedicated doubt-solving support",
      attention: "Personal Attention",
      attentionDescription: "Individual attention for students",
      approachTitle: "Our Learning Approach:",
      approachSteps: "Understand → Practice → Revise → Improve",
    },

    classes: {
      exploreSubjects: "Explore Subjects",
      chooseYour: "Choose Your",
      classHighlight: "Class",
      description:
        "Select your class to explore available subjects and learning options.",
      selectClass: "Select Class",
      classesRange: "Classes 6 to 12",
      selectedClass: "Selected Class",
      cbseBoard: "CBSE Board",
      ncertPattern: "NCERT Pattern",
      subjects: "Subjects",
      conceptPractice: "Concept & Practice",
      interestedIn: "Interested in",
      admissionDescription: "Contact us for admission and course details.",
      enquireNow: "Enquire Now",
      bottomDescription:
        "Select a class above to explore its available subjects.",
    },

    questionPapers: {
      practiceMaterial: "Practice Material",
      titlePrefix: "Question",
      titleHighlight: "Papers",
      description:
        "Access class-wise question papers, previous year papers, and exam preparation materials.",
      searchLabel: "Search Question Papers",
      searchPlaceholder: "Search by title, subject, class, exam or year...",
      total: "Total",
      classLabel: "Class",
      subjectLabel: "Subject",
      examTypeLabel: "Exam Type",
      examLabel: "Exam",
      yearLabel: "Year",
      allClasses: "All Classes",
      allSubjects: "All Subjects",
      allExams: "All Exams",
      allYears: "All Years",
      showing: "Showing",
      of: "of",
      papers: "papers",
      clearFilters: "Clear Filters",
      loading: "Loading question papers...",
      errorTitle: "Unable to Load Question Papers",
      errorDescription:
        "Something went wrong while loading the question papers. Please try again.",
      tryAgain: "Try Again",
      noPapersTitle: "No Question Papers Found",
      noMatchingPapers: "No question papers match your selected filters.",
      noPapersAvailable: "No question papers are available at the moment.",
      defaultPaperTitle: "Question Paper",
      notAvailable: "N/A",
      viewPdf: "View PDF",
      download: "Download",
      pdfUnavailable: "PDF link is currently unavailable.",
      autoUpdateInfo:
        "Question papers are updated automatically when new papers are added.",
    },

    contact: {
      getInTouch: "Get In Touch",
      startYour: "Start Your",
      learningJourney: "Learning Journey",
      description:
        "Share your learning requirements and contact us for admission or coaching details.",
      needHelp: "Need Help?",
      haveQuestions: "Have Questions?",
      contactDescription:
        "Contact us to learn more about classes, subjects, admission, coaching details, and learning options.",
      coachingClasses: "Coaching Classes",
      classes6to12: "Classes 6 to 12",
      learningPattern: "Learning Pattern",
      cbseNcertBased: "CBSE & NCERT Based",
      mode: "Mode",
      offlineCoaching: "Offline Coaching",
      simpleProcess: "Simple Process",
      enquiry: "Enquiry",
      discussion: "Discussion",
      startLearning: "Start Learning",
      admissionCourseEnquiry: "Admission / Course Enquiry",
      sendEnquiry: "Send an Enquiry",
      formDescription:
        "Fill in your details and we will provide further guidance based on your enquiry.",
      readyToLearn: "Ready to Learn?",
      startJourney: "Submit your enquiry and start your learning journey.",
    },

    enquiryForm: {
      admissionOpen: "Admission Open",
      admissionEnquiry: "Admission Enquiry",
      headerDescription:
        "Fill in your details and send your enquiry directly to us on WhatsApp.",

      studentName: "Student Name",
      studentNamePlaceholder: "Enter student name",

      parentName: "Parent Name",
      parentNamePlaceholder: "Enter parent name",

      mobileNumber: "Mobile Number",
      phonePlaceholder: "10-digit number",

      emailAddress: "Email Address",
      emailPlaceholder: "Enter email address",

      selectClass: "Select Class",
      chooseClass: "Choose Class",

      interestedSubject: "Interested Subject",
      chooseSubject: "Choose Subject",

      message: "Message",
      messagePlaceholder: "Write your enquiry...",

      optional: "Optional",

      quickWhatsApp: "Quick WhatsApp Enquiry",
      whatsappDescription:
        "After submission, WhatsApp will open automatically with your enquiry message ready to send.",

      openingWhatsApp: "Opening WhatsApp...",
      submitEnquiry: "Submit Enquiry",

      securityNote:
        "Your enquiry details will be sent securely through WhatsApp.",

      requiredError: "Please fill all required fields.",
      phoneError: "Please enter a valid 10-digit mobile number.",

      whatsappTitle: "NEW ADMISSION ENQUIRY",
      studentDetails: "STUDENT DETAILS",
      academicDetails: "ACADEMIC DETAILS",
      messageLabel: "MESSAGE",

      phoneNumber: "Phone Number",
      email: "Email",
      classLabel: "Class",
      subjectLabel: "Subject",

      notProvided: "Not provided",
      noMessage: "No message provided",
    },

    adminLogin: {
      secureAccess: "Secure Access",
      teacherLogin: "Teacher Login",
      description:
        "Login to access the admin dashboard and manage question papers.",

      emailAddress: "Email Address",
      emailPlaceholder: "teacher@example.com",

      password: "Password",
      passwordPlaceholder: "Enter your password",

      show: "Show",
      hide: "Hide",

      loginFailed: "Login Failed",
      invalidCredentials: "Invalid email or password.",

      loggingIn: "Logging in...",
      loginToDashboard: "Login to Dashboard",

      secureAdminArea: "Secure Admin Area",
      securityDescription:
        "Authorized teacher accounts only. Question paper management is protected through Supabase authentication and database policies.",

      protectedPortal: "Protected Admin Portal",
    },

    teacherDashboard: {
      loadError: "Unable to load question papers.",

      onlyPdf: "Only PDF files are allowed.",

      fileSizeError: "PDF file size must be less than 10 MB.",

      selectPdf: "Please select a PDF file.",

      fillDetails: "Please fill in all question paper details.",

      uploadSuccess: "Question paper uploaded successfully! ✅",

      uploadFailed: "Upload failed",

      deleteConfirmationStart: "Are you sure you want to delete",

      deleteConfirmationEnd: "?",

      deleteSuccess: "Question paper deleted successfully! ✅",

      deleteFailed: "Delete failed",

      teacherPanel: "Teacher Panel",

      questionPaper: "Question Paper",

      management: "Management",

      headerDescription:
        "Upload, view, download and delete question papers for students.",

      adminOverview: "Admin Overview",

      welcome: "Welcome to Teacher Dashboard",

      overviewDescription:
        "Manage question papers, monitor uploads and maintain your study resources.",

      totalPapers: "Total Papers",

      uploadedPdfs: "Uploaded PDFs",

      activeClasses: "Active Classes",

      classes6to12: "Classes 6 to 12",

      subjects: "Subjects",

      availableSubjects: "Available subjects",

      currentYear: "Current Year",

      dashboardActivity: "Dashboard activity",

      distribution: "Distribution",

      classWisePapers: "Class-wise Papers",

      classFilterDescription: "Click a class to filter the question papers.",

      uploadCenter: "Upload Center",

      uploadNewPaper: "Upload New Question Paper",

      uploadDescription: "Add a new PDF for students.",

      paperTitle: "Paper Title",

      titlePlaceholder: "Example: Mathematics Half Yearly Paper",

      classLabel: "Class",

      selectClass: "Select Class",

      subjectLabel: "Subject",

      selectSubject: "Select Subject",

      examType: "Exam Type",

      selectExam: "Select Exam",

      year: "Year",

      selectYear: "Select Year",

      questionPaperPdf: "Question Paper PDF",

      selectPdfTitle: "Select Question Paper PDF",

      pdfLimit: "Only PDF files • Maximum 10 MB",

      uploading: "Uploading...",

      uploadQuestionPaper: "Upload Question Paper",

      managePdfs: "Manage PDFs",

      uploadedQuestionPapers: "Uploaded Question Papers",

      manageDescription: "View, download or delete uploaded papers.",

      refreshing: "Refreshing...",

      refresh: "Refresh",

      searchFilter: "Search & Filter Papers",

      searchDescription: "Find papers using title, class or exam type.",

      searchPlaceholder: "Search papers...",

      allClasses: "All Classes",

      allYears: "All Years",

      allExamTypes: "All Exam Types",

      showing: "Showing",

      of: "of",

      papers: "papers",

      clearFilters: "Clear Filters",

      loadingPapers: "Loading question papers...",

      noPapers: "No question papers have been uploaded yet.",

      noMatchingPapers: "No papers match the selected filters.",

      viewPdf: "View PDF",

      download: "Download",

      deleting: "Deleting...",

      delete: "Delete",
    },

    footer: {
      description:
        "Quality coaching for CBSE students from Classes 6 to 12. Learn concepts clearly with NCERT-based preparation.",

      tagline: "Learn. Practice. Improve.",

      quickLinks: "Quick Links",

      home: "Home",

      about: "About Us",

      subjects: "Subjects",

      questionPapers: "Question Papers",

      contact: "Contact",

      classesTitle: "Classes",

      classes68: "Classes 6–8",

      classes910: "Classes 9–10",

      classes1112: "Classes 11–12",

      cbsePreparation: "CBSE Board Preparation",

      ncertLearning: "NCERT Based Learning",

      contactTitle: "Contact Us",

      location: "Location",

      phone: "Phone",

      email: "Email",

      readyTitle: "Ready to start learning?",

      readyDescription: "Join Level-Up Coaching and build stronger concepts.",

      admission: "Admission Enquiry",

      rights: "All rights reserved.",
    },
  },

  hi: {
    navbar: {
      home: "होम",
      about: "हमारे बारे में",
      teachers: "शिक्षक",
      subjects: "विषय",
      classes: "कक्षाएं",
      questionPapers: "प्रश्न पत्र",
      contact: "संपर्क",
      admission: "प्रवेश पूछताछ",
    },

    hero: {
      badge: "कक्षा 6–12 • CBSE • NCERT आधारित",

      title1: "बेहतर सीखें।",

      title2: "बेहतर अंक प्राप्त करें।",

      title3: "अपना भविष्य बनाएं।",

      description:
        "कक्षा 6–12 के विद्यार्थियों के लिए व्यक्तिगत कोचिंग, नियमित टेस्ट, डाउट सॉल्विंग और परीक्षा की तैयारी।",

      admission: "प्रवेश पूछताछ",

      papers: "प्रश्न पत्र देखें",

      classes: "कक्षाएं",

      board: "बोर्ड",

      learning: "लर्निंग",

      cardTitle: "Learn. Practice. Improve.",

      cardDescription:
        "एक केंद्रित सीखने का वातावरण जो विद्यार्थियों को कॉन्सेप्ट समझने, प्रभावी ढंग से दोहराने और शैक्षणिक प्रदर्शन में सुधार करने में मदद करता है।",

      classes610: "कक्षा 6–10",

      foundation: "मजबूत आधार और स्कूल की तैयारी",

      classes1112: "कक्षा 11–12",

      scienceStream: "विज्ञान स्ट्रीम पर केंद्रित पढ़ाई",

      regularPractice: "नियमित अभ्यास",

      conceptFocused: "✓ कॉन्सेप्ट पर ध्यान",
    },

    about: {
      smallTitle: "लेवल-अप कोचिंग के बारे में",

      title: "बेहतर सीखें।",

      title2: "और मजबूत बनें।",

      description:
        "लेवल-अप कोचिंग कक्षा 6 से 12 तक के CBSE विद्यार्थियों को NCERT पाठ्यक्रम के अनुसार व्यवस्थित शिक्षा और शैक्षणिक मार्गदर्शन प्रदान करती है। हमारा ध्यान स्पष्ट कॉन्सेप्ट, नियमित अभ्यास और निरंतर सुधार पर है।",

      focusedTitle: "केंद्रित सीखने का वातावरण",

      focusedDescription:
        "हमारा उद्देश्य केवल पाठ्यक्रम पूरा करना नहीं है, बल्कि विद्यार्थियों को कॉन्सेप्ट अच्छी तरह समझने, नियमित अभ्यास करने और अपने शैक्षणिक प्रदर्शन में सुधार करने में सहायता करना है।",

      structuredStudy: "व्यवस्थित अध्ययन",

      regularPractice: "नियमित अभ्यास",

      doubtSupport: "डाउट समाधान",

      feature1Title: "NCERT आधारित शिक्षा",

      feature1Text:
        "विद्यार्थियों को NCERT पाठ्यक्रम के अनुसार स्पष्ट और व्यवस्थित तरीके से कॉन्सेप्ट सिखाए जाते हैं।",

      feature2Title: "कॉन्सेप्ट की स्पष्टता",

      feature2Text:
        "कठिन विषयों को सरल उदाहरणों और व्यावहारिक तरीकों से समझाया जाता है।",

      feature3Title: "नियमित अभ्यास",

      feature3Text:
        "नियमित प्रश्न, रिवीजन और अभ्यास सत्र विद्यार्थियों की तैयारी को बेहतर बनाने में सहायता करते हैं।",

      feature4Title: "डाउट समाधान",

      feature4Text:
        "विद्यार्थियों को अपने डाउट दूर करने के लिए उचित मार्गदर्शन और सहायता दी जाती है।",

      ourApproach: "हमारा तरीका:",

      approachSteps: "कॉन्सेप्ट → अभ्यास → रिवीजन → सुधार",
    },

    teacher: {
      smallTitle: "हमारे शिक्षक से मिलें",

      titlePrefix: "अनुभव से",

      titleHighlight: "सीखें",

      titleSuffix: "और आगे बढ़ें",

      description:
        "ऐसे समर्पित शिक्षक से मार्गदर्शन प्राप्त करें जो कॉन्सेप्ट की स्पष्टता, नियमित अभ्यास और विद्यार्थियों के विकास पर ध्यान देते हैं।",

      name: "Suraj Dubey",

      subject: "गणित और विज्ञान",

      qualification: "डिप्लोमा / B.A.",

      classes: "कक्षा 6–12",

      experience: "5+ वर्षों का अनुभव",

      teacherBadge: "शिक्षक",

      experienceLabel: "अनुभव",

      learningGuide: "आपके सीखने के मार्गदर्शक",

      qualificationLabel: "शैक्षणिक योग्यता",

      classesLabel: "कक्षाएं",

      teachingStyle: "शिक्षण शैली",

      teachingStyleValue: "कॉन्सेप्ट की स्पष्टता • अभ्यास • डाउट समाधान",

      boardFocus: "बोर्ड केंद्रित",

      subjectsTitle: "मेरे द्वारा पढ़ाए जाने वाले विषय",

      subjectCount: "विषय",

      mathematics: "गणित",

      science: "विज्ञान",

      physics: "भौतिक विज्ञान",

      chemistry: "रसायन विज्ञान",

      basics: "बेसिक कॉन्सेप्ट",

      exam: "परीक्षा की तैयारी",

      goalTitle: "मेरा शिक्षण उद्देश्य",

      goalText:
        "सीखने को सरल, रोचक और प्रभावी बनाना ताकि प्रत्येक विद्यार्थी अपनी समझ और शैक्षणिक प्रदर्शन में सुधार कर सके।",

      conceptClarity: "कॉन्सेप्ट की स्पष्टता",

      conceptClarityText: "बुनियादी विषयों में मजबूत आधार",

      studentSupport: "विद्यार्थी सहायता",

      studentSupportText: "विद्यार्थियों पर व्यक्तिगत ध्यान",

      betterLearning: "बेहतर सीखना",

      betterLearningText: "नियमित अभ्यास और रिवीजन",

      quote: "आइए, मिलकर एक उज्ज्वल भविष्य बनाएं।",
    },

    whyChoose: {
      smallTitle: "हमें क्यों चुनें",

      titlePrefix: "मजबूत बनाएं",

      titleHighlight: "शैक्षणिक आधार",

      description:
        "हम ऐसा व्यवस्थित सीखने का वातावरण प्रदान करते हैं जो विषय की समझ, नियमित अभ्यास और निरंतर शैक्षणिक सुधार पर केंद्रित है।",

      learningTitle: "ऐसी पढ़ाई जो",

      learningHighlight: "आपको आगे बढ़ाए",

      learningDescription:
        "हमारा तरीका कॉन्सेप्ट को स्पष्ट रूप से समझने, नियमित अभ्यास करने और विद्यार्थियों की तैयारी में चरणबद्ध तरीके से सुधार करने पर आधारित है।",

      understand: "समझें",

      understandText: "कॉन्सेप्ट को अच्छी तरह समझें।",

      practice: "अभ्यास करें",

      practiceText: "नियमित रूप से प्रश्न हल करें।",

      improve: "सुधार करें",

      improveText: "रिवीजन के माध्यम से प्रदर्शन में सुधार करें।",

      cbse: "CBSE केंद्रित",

      cbseDescription: "CBSE बोर्ड पर केंद्रित तैयारी",

      ncert: "NCERT आधारित",

      ncertDescription: "NCERT पाठ्यक्रम पर आधारित शिक्षा",

      classes: "कक्षा 6–12",

      classesDescription: "कक्षा 6 से 12 तक संपूर्ण कवरेज",

      tests: "नियमित टेस्ट",

      testsDescription: "नियमित टेस्ट और रिवीजन",

      doubts: "डाउट समाधान",

      doubtsDescription: "डाउट समाधान के लिए विशेष सहायता",

      attention: "व्यक्तिगत ध्यान",

      attentionDescription: "विद्यार्थियों पर व्यक्तिगत ध्यान",

      approachTitle: "हमारी सीखने की प्रक्रिया:",

      approachSteps: "समझें → अभ्यास करें → रिवीजन करें → सुधार करें",
    },

    classes: {
      exploreSubjects: "विषय देखें",

      chooseYour: "अपनी",

      classHighlight: "कक्षा चुनें",

      description:
        "उपलब्ध विषयों और सीखने के विकल्पों को देखने के लिए अपनी कक्षा चुनें।",

      selectClass: "कक्षा चुनें",

      classesRange: "कक्षा 6 से 12 तक",

      selectedClass: "चयनित कक्षा",

      cbseBoard: "CBSE बोर्ड",

      ncertPattern: "NCERT पैटर्न",

      subjects: "विषय",

      conceptPractice: "कॉन्सेप्ट और अभ्यास",

      interestedIn: "क्या आप इसमें रुचि रखते हैं:",

      admissionDescription:
        "प्रवेश और कोर्स की जानकारी के लिए हमसे संपर्क करें।",

      enquireNow: "पूछताछ करें",

      bottomDescription:
        "उपलब्ध विषयों को देखने के लिए ऊपर से अपनी कक्षा चुनें।",
    },

    questionPapers: {
      practiceMaterial: "अभ्यास सामग्री",

      titlePrefix: "प्रश्न",

      titleHighlight: "पत्र",

      description:
        "कक्षा के अनुसार प्रश्न पत्र, पिछले वर्षों के प्रश्न पत्र और परीक्षा की तैयारी की सामग्री प्राप्त करें।",

      searchLabel: "प्रश्न पत्र खोजें",

      searchPlaceholder: "शीर्षक, विषय, कक्षा, परीक्षा या वर्ष से खोजें...",

      total: "कुल",

      classLabel: "कक्षा",

      subjectLabel: "विषय",

      examTypeLabel: "परीक्षा का प्रकार",

      examLabel: "परीक्षा",

      yearLabel: "वर्ष",

      allClasses: "सभी कक्षाएं",

      allSubjects: "सभी विषय",

      allExams: "सभी परीक्षाएं",

      allYears: "सभी वर्ष",

      showing: "दिखाए जा रहे हैं",

      of: "कुल",

      papers: "प्रश्न पत्र",

      clearFilters: "फ़िल्टर हटाएं",

      loading: "प्रश्न पत्र लोड हो रहे हैं...",

      errorTitle: "प्रश्न पत्र लोड नहीं हो सके",

      errorDescription:
        "प्रश्न पत्र लोड करते समय समस्या हुई। कृपया दोबारा प्रयास करें।",

      tryAgain: "दोबारा प्रयास करें",

      noPapersTitle: "कोई प्रश्न पत्र नहीं मिला",

      noMatchingPapers:
        "चुने गए फ़िल्टर के अनुसार कोई प्रश्न पत्र उपलब्ध नहीं है।",

      noPapersAvailable: "फिलहाल कोई प्रश्न पत्र उपलब्ध नहीं है।",

      defaultPaperTitle: "प्रश्न पत्र",

      notAvailable: "उपलब्ध नहीं",

      viewPdf: "PDF देखें",

      download: "डाउनलोड करें",

      pdfUnavailable: "PDF का लिंक फिलहाल उपलब्ध नहीं है।",

      autoUpdateInfo:
        "नए प्रश्न पत्र जोड़े जाने पर यह सूची अपने आप अपडेट हो जाती है।",
    },

    contact: {
      getInTouch: "संपर्क करें",

      startYour: "अपनी",

      learningJourney: "सीखने की यात्रा शुरू करें",

      description:
        "अपनी सीखने से जुड़ी आवश्यकताएं साझा करें और प्रवेश या कोचिंग की जानकारी के लिए हमसे संपर्क करें।",

      needHelp: "सहायता चाहिए?",

      haveQuestions: "क्या आपके कोई प्रश्न हैं?",

      contactDescription:
        "कक्षाओं, विषयों, प्रवेश, कोचिंग की जानकारी और सीखने के विकल्पों के बारे में अधिक जानने के लिए हमसे संपर्क करें।",

      coachingClasses: "कोचिंग कक्षाएं",

      classes6to12: "कक्षा 6 से 12 तक",

      learningPattern: "शिक्षण पैटर्न",

      cbseNcertBased: "CBSE और NCERT आधारित",

      mode: "माध्यम",

      offlineCoaching: "ऑफलाइन कोचिंग",

      simpleProcess: "सरल प्रक्रिया",

      enquiry: "पूछताछ",

      discussion: "चर्चा",

      startLearning: "सीखना शुरू करें",

      admissionCourseEnquiry: "प्रवेश / कोर्स पूछताछ",

      sendEnquiry: "पूछताछ भेजें",

      formDescription:
        "अपनी जानकारी भरें। आपकी पूछताछ के अनुसार हम आपको आगे की जानकारी और मार्गदर्शन प्रदान करेंगे।",

      readyToLearn: "क्या आप सीखने के लिए तैयार हैं?",

      startJourney: "अपनी पूछताछ भेजें और अपनी सीखने की यात्रा शुरू करें।",
    },

    enquiryForm: {
      admissionOpen: "प्रवेश शुरू है",

      admissionEnquiry: "प्रवेश पूछताछ",

      headerDescription:
        "अपनी जानकारी भरें और अपनी पूछताछ सीधे WhatsApp के माध्यम से भेजें।",

      studentName: "विद्यार्थी का नाम",

      studentNamePlaceholder: "विद्यार्थी का नाम दर्ज करें",

      parentName: "अभिभावक का नाम",

      parentNamePlaceholder: "अभिभावक का नाम दर्ज करें",

      mobileNumber: "मोबाइल नंबर",

      phonePlaceholder: "10 अंकों का मोबाइल नंबर",

      emailAddress: "ईमेल पता",

      emailPlaceholder: "ईमेल पता दर्ज करें",

      selectClass: "कक्षा चुनें",

      chooseClass: "कक्षा चुनें",

      interestedSubject: "रुचि का विषय",

      chooseSubject: "विषय चुनें",

      message: "संदेश",

      messagePlaceholder: "अपनी पूछताछ लिखें...",

      optional: "वैकल्पिक",

      quickWhatsApp: "त्वरित WhatsApp पूछताछ",

      whatsappDescription:
        "फॉर्म जमा करने के बाद WhatsApp अपने आप खुलेगा और आपकी पूछताछ का संदेश भेजने के लिए तैयार रहेगा।",

      openingWhatsApp: "WhatsApp खोला जा रहा है...",

      submitEnquiry: "पूछताछ भेजें",

      securityNote:
        "आपकी पूछताछ की जानकारी WhatsApp के माध्यम से सुरक्षित रूप से भेजी जाएगी।",

      requiredError: "कृपया सभी आवश्यक फ़ील्ड भरें।",

      phoneError: "कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।",

      whatsappTitle: "नई प्रवेश पूछताछ",

      studentDetails: "विद्यार्थी की जानकारी",

      academicDetails: "शैक्षणिक जानकारी",

      messageLabel: "संदेश",

      phoneNumber: "फोन नंबर",

      email: "ईमेल",

      classLabel: "कक्षा",

      subjectLabel: "विषय",

      notProvided: "उपलब्ध नहीं",

      noMessage: "कोई संदेश नहीं दिया गया",
    },

    adminLogin: {
      secureAccess: "सुरक्षित प्रवेश",

      teacherLogin: "शिक्षक लॉगिन",

      description:
        "एडमिन डैशबोर्ड खोलने और प्रश्न पत्र प्रबंधित करने के लिए लॉगिन करें।",

      emailAddress: "ईमेल पता",

      emailPlaceholder: "teacher@example.com",

      password: "पासवर्ड",

      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",

      show: "दिखाएं",

      hide: "छिपाएं",

      loginFailed: "लॉगिन असफल",

      invalidCredentials: "ईमेल या पासवर्ड गलत है।",

      loggingIn: "लॉगिन हो रहा है...",

      loginToDashboard: "डैशबोर्ड में लॉगिन करें",

      secureAdminArea: "सुरक्षित एडमिन क्षेत्र",

      securityDescription:
        "केवल अधिकृत शिक्षक खाते ही प्रवेश कर सकते हैं। प्रश्न पत्र प्रबंधन Supabase Authentication और Database Policies द्वारा सुरक्षित है।",

      protectedPortal: "सुरक्षित एडमिन पोर्टल",
    },

    teacherDashboard: {
      loadError: "प्रश्न पत्र लोड नहीं हो सके।",

      onlyPdf: "केवल PDF फाइलें ही स्वीकार की जाती हैं।",

      fileSizeError: "PDF फाइल का आकार 10 MB से कम होना चाहिए।",

      selectPdf: "कृपया एक PDF फाइल चुनें।",

      fillDetails: "कृपया प्रश्न पत्र की सभी जानकारी भरें।",

      uploadSuccess: "प्रश्न पत्र सफलतापूर्वक अपलोड हो गया! ✅",

      uploadFailed: "अपलोड असफल रहा",

      deleteConfirmationStart: "क्या आप इसे हटाना चाहते हैं",

      deleteConfirmationEnd: "?",

      deleteSuccess: "प्रश्न पत्र सफलतापूर्वक हटा दिया गया! ✅",

      deleteFailed: "हटाना असफल रहा",

      teacherPanel: "शिक्षक पैनल",

      questionPaper: "प्रश्न पत्र",

      management: "प्रबंधन",

      headerDescription:
        "विद्यार्थियों के लिए प्रश्न पत्र अपलोड, देखें, डाउनलोड और हटाएं।",

      adminOverview: "एडमिन अवलोकन",

      welcome: "शिक्षक डैशबोर्ड में आपका स्वागत है",

      overviewDescription:
        "प्रश्न पत्र प्रबंधित करें, अपलोड की निगरानी करें और अध्ययन सामग्री को व्यवस्थित रखें।",

      totalPapers: "कुल प्रश्न पत्र",

      uploadedPdfs: "अपलोड की गई PDF",

      activeClasses: "सक्रिय कक्षाएं",

      classes6to12: "कक्षा 6 से 12",

      subjects: "विषय",

      availableSubjects: "उपलब्ध विषय",

      currentYear: "वर्तमान वर्ष",

      dashboardActivity: "डैशबोर्ड गतिविधि",

      distribution: "वितरण",

      classWisePapers: "कक्षा के अनुसार प्रश्न पत्र",

      classFilterDescription:
        "प्रश्न पत्र फ़िल्टर करने के लिए किसी कक्षा पर क्लिक करें।",

      uploadCenter: "अपलोड केंद्र",

      uploadNewPaper: "नया प्रश्न पत्र अपलोड करें",

      uploadDescription: "विद्यार्थियों के लिए नई PDF जोड़ें।",

      paperTitle: "प्रश्न पत्र का शीर्षक",

      titlePlaceholder: "उदाहरण: गणित अर्धवार्षिक प्रश्न पत्र",

      classLabel: "कक्षा",

      selectClass: "कक्षा चुनें",

      subjectLabel: "विषय",

      selectSubject: "विषय चुनें",

      examType: "परीक्षा का प्रकार",

      selectExam: "परीक्षा चुनें",

      year: "वर्ष",

      selectYear: "वर्ष चुनें",

      questionPaperPdf: "प्रश्न पत्र PDF",

      selectPdfTitle: "प्रश्न पत्र PDF चुनें",

      pdfLimit: "केवल PDF फाइलें • अधिकतम 10 MB",

      uploading: "अपलोड हो रहा है...",

      uploadQuestionPaper: "प्रश्न पत्र अपलोड करें",

      managePdfs: "PDF प्रबंधन",

      uploadedQuestionPapers: "अपलोड किए गए प्रश्न पत्र",

      manageDescription:
        "अपलोड किए गए प्रश्न पत्र देखें, डाउनलोड करें या हटाएं।",

      refreshing: "रिफ्रेश हो रहा है...",

      refresh: "रिफ्रेश",

      searchFilter: "प्रश्न पत्र खोजें और फ़िल्टर करें",

      searchDescription:
        "शीर्षक, कक्षा या परीक्षा के प्रकार से प्रश्न पत्र खोजें।",

      searchPlaceholder: "प्रश्न पत्र खोजें...",

      allClasses: "सभी कक्षाएं",

      allYears: "सभी वर्ष",

      allExamTypes: "सभी परीक्षा प्रकार",

      showing: "दिखाए जा रहे हैं",

      of: "में से",

      papers: "प्रश्न पत्र",

      clearFilters: "फ़िल्टर हटाएं",

      loadingPapers: "प्रश्न पत्र लोड हो रहे हैं...",

      noPapers: "अभी तक कोई प्रश्न पत्र अपलोड नहीं किया गया है।",

      noMatchingPapers: "चुने गए फ़िल्टर से कोई प्रश्न पत्र नहीं मिला।",

      viewPdf: "PDF देखें",

      download: "डाउनलोड करें",

      deleting: "हटाया जा रहा है...",

      delete: "हटाएं",
    },

    footer: {
      description:
        "कक्षा 6 से 12 तक के CBSE विद्यार्थियों के लिए गुणवत्तापूर्ण कोचिंग। NCERT आधारित तैयारी के साथ कॉन्सेप्ट को स्पष्ट रूप से समझें।",

      tagline: "सीखें। अभ्यास करें। सुधार करें।",

      quickLinks: "त्वरित लिंक",

      home: "होम",

      about: "हमारे बारे में",

      subjects: "विषय",

      questionPapers: "प्रश्न पत्र",

      contact: "संपर्क",

      classesTitle: "कक्षाएं",

      classes68: "कक्षा 6–8",

      classes910: "कक्षा 9–10",

      classes1112: "कक्षा 11–12",

      cbsePreparation: "CBSE बोर्ड की तैयारी",

      ncertLearning: "NCERT आधारित शिक्षा",

      contactTitle: "संपर्क करें",

      location: "स्थान",

      phone: "फोन",

      email: "ईमेल",

      readyTitle: "क्या आप सीखना शुरू करने के लिए तैयार हैं?",

      readyDescription:
        "Level-Up Coaching से जुड़ें और अपने कॉन्सेप्ट को मजबूत बनाएं।",

      admission: "प्रवेश पूछताछ",

      rights: "सर्वाधिकार सुरक्षित।",
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("levelup-language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("levelup-language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((current) => (current === "en" ? "hi" : "en"));
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
