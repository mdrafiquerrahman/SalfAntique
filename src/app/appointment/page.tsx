"use client";
import { useState } from "react";
import Link from "next/link";

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    jewelryType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending appointment request:", error);
      alert(error instanceof Error ? error.message : "There was an error sending your request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-[#fdfdfc] py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <div className="py-32 border border-gray-100 bg-white shadow-sm max-w-2xl mx-auto px-8 rounded-2xl">
            <h1 className="font-serif text-3xl text-gray-900 tracking-wide uppercase italic">Thank You</h1>
            <div className="mt-4 h-px w-20 bg-brilliant-green mx-auto opacity-30"></div>
            <p className="mt-8 text-gray-600 font-serif text-lg italic">
              Your virtual appointment request has been received. Our curator will contact you shortly to confirm a time.
            </p>
            <Link 
              href="/" 
              className="mt-12 inline-block bg-brilliant-green px-10 py-3 text-[11px] font-bold tracking-[0.2em] text-white uppercase hover:bg-opacity-90 transition-all rounded-full"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfdfc] py-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-3xl lg:text-4xl text-gray-900 tracking-wide uppercase italic">
            Virtual Appointment
          </h1>
          <div className="mt-4 h-px w-20 bg-brilliant-green mx-auto opacity-30"></div>
          <p className="mt-6 text-gray-700 font-serif italic text-lg">
            Experience our collection from the comfort of your home with a private virtual consultation.
          </p>
        </div>

        <div className="bg-white p-8 lg:p-12 border border-gray-100 shadow-sm rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-700 uppercase mb-3">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brilliant-green transition-colors text-sm font-serif italic bg-transparent text-gray-900 placeholder:text-gray-400 rounded-none"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-700 uppercase mb-3">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brilliant-green transition-colors text-sm font-serif italic bg-transparent text-gray-900 placeholder:text-gray-400 rounded-none"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-700 uppercase mb-3">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brilliant-green transition-colors text-sm font-serif italic bg-transparent text-gray-900 placeholder:text-gray-400 rounded-none"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-700 uppercase mb-3">Type of Jewelry</label>
                <select 
                  name="jewelryType"
                  required
                  value={formData.jewelryType}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brilliant-green transition-colors text-sm font-serif italic bg-transparent cursor-pointer text-gray-900 rounded-none"
                >
                  <option value="" disabled className="text-gray-400">Select jewelry type</option>
                  <option value="Engagement Rings" className="text-gray-900">Engagement Rings</option>
                  <option value="Wedding Rings" className="text-gray-900">Wedding Rings</option>
                  <option value="Vintage Necklaces" className="text-gray-900">Vintage Necklaces</option>
                  <option value="Antique Earrings" className="text-gray-900">Antique Earrings</option>
                  <option value="Rare Gemstones" className="text-gray-900">Rare Gemstones</option>
                  <option value="Other" className="text-gray-900">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-widest text-gray-700 uppercase mb-3">Additional Details (Optional)</label>
              <textarea 
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-200 p-4 focus:outline-none focus:border-brilliant-green transition-colors text-sm font-serif italic bg-gray-50/50 text-gray-900 placeholder:text-gray-400 rounded-xl"
                placeholder="Tell us about the pieces you're interested in..."
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full bg-brilliant-green py-5 text-[11px] font-bold tracking-[0.2em] text-white uppercase hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 rounded-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Request Appointment"
              )}
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-gray-100 flex flex-col items-center">
            <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-8">Or connect instantly</span>
            <div className="flex flex-col items-center gap-4">
              <a 
                href="https://wa.me/917977556989" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-10 py-4 text-[14px] font-bold text-white shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all hover:scale-[1.02] hover:shadow-[0_15px_25px_rgba(37,211,102,0.3)] active:scale-[0.98]"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.197 1.441 4.866 1.442 5.22.002 9.469-4.248 9.471-9.47.001-2.529-.985-4.903-2.777-6.696-1.793-1.793-4.167-2.78-6.697-2.781-5.221 0-9.47 4.248-9.472 9.47-.001 1.902.553 3.758 1.599 5.359l-1.048 3.825 3.931-1.031-.127-.089zm13.313-10.421c-.244-.122-1.441-.712-1.664-.793-.223-.081-.385-.122-.547.122-.162.244-.63.793-.772.955-.142.162-.284.183-.528.061-.244-.122-1.03-.38-1.962-1.211-.725-.647-1.215-1.445-1.357-1.688-.142-.244-.015-.376.107-.497.11-.11.244-.284.365-.427.122-.142.162-.244.244-.406.081-.162.041-.305-.02-.427-.061-.122-.547-1.32-.75-1.81-.197-.477-.397-.412-.547-.419-.142-.007-.305-.008-.467-.008-.162 0-.427.061-.65.305-.223.244-.853.834-.853 2.031 0 1.197.874 2.353.996 2.516.122.163 1.72 2.626 4.167 3.683.582.251 1.036.401 1.391.513.584.186 1.116.16 1.536.097.469-.071 1.441-.589 1.644-1.159.203-.57.203-1.057.142-1.159-.061-.101-.223-.162-.467-.284z" />
                </svg>
                Chat on WhatsApp
              </a>
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">START NEW CONVERSATION</span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[9px] text-gray-500 uppercase tracking-widest">
          By requesting an appointment, you agree to be contacted via the information provided.
        </p>
      </div>
    </main>
  );
}
