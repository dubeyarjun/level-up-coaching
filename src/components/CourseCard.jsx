function CourseCard({ icon, title, subtitle, description, subjects }) {
  return (
    <div className="group rounded-2xl border border-gray-700 bg-[#151D30] p-6 transition duration-300 hover:-translate-y-2 hover:border-lime-400 hover:shadow-xl hover:shadow-lime-400/10">
      {/* Icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-lime-400/10 text-3xl">
        {icon}
      </div>

      {/* Class Title */}
      <h3 className="text-2xl font-bold text-white">{title}</h3>

      {/* Board Pattern */}
      <p className="mt-2 text-sm font-semibold text-lime-400">{subtitle}</p>

      {/* Description */}
      <p className="mt-4 text-sm leading-6 text-gray-400">{description}</p>

      {/* Subjects */}
      <ul className="mt-5 space-y-2">
        {subjects.map((subject) => (
          <li
            key={subject}
            className="flex items-center gap-2 text-sm text-gray-300"
          >
            <span className="text-lime-400">✓</span>
            {subject}
          </li>
        ))}
      </ul>

      {/* Button */}
      <a
        href="#contact"
        className="mt-6 block w-full rounded-lg border border-lime-400 px-4 py-2 text-center font-semibold text-lime-400 transition hover:bg-lime-400 hover:text-black"
      >
        Enquire Now
      </a>
    </div>
  );
}

export default CourseCard;
