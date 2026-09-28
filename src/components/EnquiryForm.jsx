import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function EnquiryForm() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    className: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Required fields validation
    if (
      !formData.studentName.trim() ||
      !formData.parentName.trim() ||
      !formData.phone.trim() ||
      !formData.className ||
      !formData.subject
    ) {
      alert(t.enquiryForm.requiredError);
      return;
    }

    // Phone number validation
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert(t.enquiryForm.phoneError);
      return;
    }

    setIsSubmitting(true);

    // Coaching WhatsApp number
    const whatsappNumber = "917985123521";

    // WhatsApp message
    const whatsappMessage = `
📚 *${t.enquiryForm.whatsappTitle}*

━━━━━━━━━━━━━━━━━━

👨‍🎓 *${t.enquiryForm.studentDetails}*

${t.enquiryForm.studentName}: ${formData.studentName}
${t.enquiryForm.parentName}: ${formData.parentName}
${t.enquiryForm.phoneNumber}: ${formData.phone}
${t.enquiryForm.email}: ${formData.email || t.enquiryForm.notProvided}

🎓 *${t.enquiryForm.academicDetails}*

${t.enquiryForm.classLabel}: ${formData.className}
${t.enquiryForm.subjectLabel}: ${formData.subject}

📝 *${t.enquiryForm.messageLabel}*

${formData.message || t.enquiryForm.noMessage}

━━━━━━━━━━━━━━━━━━
📍 Level-Up Coaching
📞 ${t.enquiryForm.admissionEnquiry}
    `.trim();

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Reset form
    setFormData({
      studentName: "",
      parentName: "",
      phone: "",
      email: "",
      className: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Top Accent */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400 to-transparent" />

      {/* Header */}
      <div className="relative">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />

          <span className="text-xs font-bold uppercase tracking-widest text-lime-400">
            {t.enquiryForm.admissionOpen}
          </span>
        </div>

        <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {t.enquiryForm.admissionEnquiry}
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
          {t.enquiryForm.headerDescription}
        </p>
      </div>

      {/* Form Fields */}
      <div className="relative mt-7 grid gap-5 sm:grid-cols-2">
        {/* Student Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            {t.enquiryForm.studentName}
            <span className="ml-1 text-lime-400">*</span>
          </label>

          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder={t.enquiryForm.studentNamePlaceholder}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 hover:border-slate-600 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
          />
        </div>

        {/* Parent Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            {t.enquiryForm.parentName}
            <span className="ml-1 text-lime-400">*</span>
          </label>

          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            placeholder={t.enquiryForm.parentNamePlaceholder}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 hover:border-slate-600 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            {t.enquiryForm.mobileNumber}
            <span className="ml-1 text-lime-400">*</span>
          </label>

          <div className="flex">
            <div className="flex items-center rounded-l-xl border border-r-0 border-slate-700 bg-slate-900 px-3 text-sm text-slate-400">
              +91
            </div>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t.enquiryForm.phonePlaceholder}
              pattern="[0-9]{10}"
              maxLength="10"
              inputMode="numeric"
              required
              className="w-full rounded-r-xl border border-slate-700 bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            {t.enquiryForm.emailAddress}

            <span className="ml-2 text-xs font-normal text-slate-600">
              {t.enquiryForm.optional}
            </span>
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.enquiryForm.emailPlaceholder}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 hover:border-slate-600 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
          />
        </div>

        {/* Class */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            {t.enquiryForm.selectClass}
            <span className="ml-1 text-lime-400">*</span>
          </label>

          <select
            name="className"
            value={formData.className}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
          >
            <option value="">{t.enquiryForm.chooseClass}</option>

            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 11">Class 11</option>
            <option value="Class 12">Class 12</option>
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-300">
            {t.enquiryForm.interestedSubject}
            <span className="ml-1 text-lime-400">*</span>
          </label>

          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
          >
            <option value="">{t.enquiryForm.chooseSubject}</option>

            <option value="All Subjects">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="English">English</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="relative mt-5">
        <label className="mb-2 block text-sm font-semibold text-slate-300">
          {t.enquiryForm.message}

          <span className="ml-2 text-xs font-normal text-slate-600">
            {t.enquiryForm.optional}
          </span>
        </label>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          placeholder={t.enquiryForm.messagePlaceholder}
          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 hover:border-slate-600 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
        />
      </div>

      {/* WhatsApp Info */}
      <div className="relative mt-5 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-lg">
          💬
        </div>

        <div>
          <p className="text-sm font-semibold text-emerald-300">
            {t.enquiryForm.quickWhatsApp}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            {t.enquiryForm.whatsappDescription}
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative mt-6 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-lime-400 px-6 py-4 font-extrabold text-slate-950 shadow-lg shadow-lime-400/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-300 hover:shadow-xl hover:shadow-lime-400/20 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />

        <span className="relative">
          {isSubmitting
            ? t.enquiryForm.openingWhatsApp
            : t.enquiryForm.submitEnquiry}
        </span>

        {!isSubmitting && (
          <span className="relative text-lg transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        )}
      </button>

      {/* Bottom Note */}
      <p className="relative mt-4 text-center text-xs text-slate-600">
        {t.enquiryForm.securityNote}
      </p>
    </form>
  );
}

export default EnquiryForm;
