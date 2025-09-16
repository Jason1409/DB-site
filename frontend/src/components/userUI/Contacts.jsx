// src/components/ContactSection.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { sendContactForm } from "../../services/ctcApi";
import { useEffect } from "react";
export default function ContactSection() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try{
      await sendContactForm(data);
      toast.success("Message sent successfully!");
      reset(); // Reset the form after successful submission
    }
    catch(err){
      console.error(err);
      toast.error("Failed to send message,Please try again or Give us a call");
    }
  };

  return (
    <section className="bg-[#F5EFEB] py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Info Card */}
        <div className="bg-white shadow-md rounded-lg p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#1a1a40] mb-4">Get a Free Quote</h2>
          <p className="text-gray-700 mb-8">
            Our team of Engineers and experts is ready to help you choose the perfect solution for your space.
            Contact us today for a free consultation and detailed quote.
          </p>

          <div className="flex items-start mb-6">
            <div className="bg-[#f8bb71] p-3 rounded-md mr-4">
              <FaPhoneAlt className="text-[#1a1a40] text-xl" />
            </div>
            <div>
              <p className="font-semibold">Phone</p>
              <p href="tel:+971521136657" className="text-blue-500 underline">+971521136657</p>
            </div>
          </div>

          <div className="flex items-start mb-6">
            <div className="bg-[#f8bb71] p-3 rounded-md mr-4">
              <FaEnvelope className="text-[#1a1a40] text-xl" />
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p href="mailto:aneeshabib899@gmail.com" className="text-blue-500 underline">aneeshabib899@gmail.com</p>
              <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-[#f8bb71] p-3 rounded-md mr-4">
              <FaMapMarkerAlt className="text-[#1a1a40] text-xl" />
            </div>
            <div>
              <p className="font-semibold">Our Address</p>
              <p>DUBAI REAL ESTATE CORPORATION OFFICE OF13 621 Um Hurair Second Dubai</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-[#FFFDE7] p-4">
            <h2 className="text-2xl font-bold text-[#1a1a40]">Send Us a Message</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            {/* Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Phone Number *</label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: { value: /^\(\d{3}\)\s?\d{3}-\d{4}$/, message: "Format: (555) 123-4567" }
                  })}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1">Email Address *</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email address" }
                })}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-1">Message *</label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows="4"
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Tell us What your looking for..."
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-[#1a1a40] hover:bg-[#262673] text-white font-semibold py-2 px-6 rounded-md transition-colors w-full sm:w-auto"
              >
                <FaPaperPlane />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              <a
                href="tel:+971521136657"
                className="flex items-center justify-center gap-2 border border-[#1a1a40] text-[#1a1a40] hover:bg-[#1a1a40] hover:text-white font-semibold py-2 px-6 rounded-md transition-colors w-full sm:w-auto"
              >
                📞 Call Now
              </a>
            </div>

            {/* Privacy note */}
            <p className="text-sm text-gray-500 bg-[#F5EFEB] p-3 rounded-md mt-2">
              By submitting this form, you agree to our privacy policy. We’ll never share your information.
            </p>

            {/* Success message */}
            {isSubmitSuccessful && (
              <p className="text-green-600 text-sm font-semibold mt-2">
                ✅ Your message has been sent successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
