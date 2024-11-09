import React, { useState } from "react";

const ContactInputBox = ({ type, placeholder, name, onChange, value }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base text-gray-800 transition-all duration-300 focus:border-[#00AA55] focus:ring-2 focus:ring-[#00AA55]/30 outline-none bg-white"
      />
    </div>
  );
};

const ContactTextArea = ({ row, placeholder, name, onChange, value }) => {
  return (
    <div className="mb-6">
      <textarea
        rows={row}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base text-gray-800 resize-none transition-all duration-300 focus:border-[#00AA55] focus:ring-2 focus:ring-[#00AA55]/30 outline-none bg-white"
      />
    </div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-44">
      <div className="container mx-auto px-4 lg:px-16">
        <div className="grid md:grid-cols-2 gap-12 ">
          <div>
            <div className="mb-12">
              <span className="text-[#00AA55] font-semibold uppercase tracking-wide">
                Get In Touch
              </span>
              <h2 className="text-6xl md:text-5xl font-bold text-gray-800 mt-4">
                Contact Evenity
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Have questions or ready to plan your next event? Reach out to
                us, and we'll help turn your vision into reality.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: (
                    <svg
                      className="w-6 h-6 text-[#00AA55]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  ),
                  title: "Our Location",
                  detail: "Topaz No.7, Malang, Indonesia",
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6 text-[#00AA55]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.2 2.2z" />
                    </svg>
                  ),
                  title: "Phone Number",
                  detail: "(+62) 81 414 257 9980",
                },
                {
                  icon: (
                    <svg
                      className="w-6 h-6 text-[#00AA55]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  ),
                  title: "Email Address",
                  detail: "evenity@event.com",
                },
              ].map((contact, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="bg-[#00AA55]/10 p-3 rounded-full">
                    {contact.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {contact.title}
                    </h4>
                    <p className="text-gray-600">{contact.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 w-[80%]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <ContactInputBox
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
              <ContactInputBox
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
              <ContactInputBox
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <ContactTextArea
                row="6"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full bg-[#00AA55] text-white py-3 rounded-lg hover:bg-[#00AA55]/90 transition-colors duration-300 font-semibold uppercase tracking-wide"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.6189892709667!2d112.60016647580406!3d-7.934801392089144!2m3!1f0! 2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78830060e53ab7%3A0x7877740b17197744!2sEnigma%20Camp%20Training%20Center%20Malang!5e0!3m2!1sid!2sid!4v1730998196279!5m2!1sid!2sid"
            title="map"
            scrolling="no"
            frameBorder="0"
            width="100%"
            height="450"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
