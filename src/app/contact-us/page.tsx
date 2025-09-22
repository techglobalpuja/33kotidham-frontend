'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

const ContactUsPage: React.FC = () => {
  const router = useRouter();
  
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demonstration, log form data to console
    console.log('Form submitted:', formData);
    // In production, integrate with backend API to handle form submission
    alert('Thank you for contacting 33KotiDham! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col justify-start items-center w-full bg-white overflow-x-hidden">
      {/* Header with background */}
      <section 
        className="w-full py-[53px] sm:py-[62px] md:py-[70px] px-[42px] sm:px-[49px] md:px-[56px]"
        style={{
          backgroundImage: "url('/images/img__4.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col justify-start items-center w-full lg:w-3/4 mb-[14px] sm:mb-[16px] md:mb-[18px]">
              <div className="flex flex-col justify-start items-center w-full mr-[62px] sm:mr-[72px] md:mr-[82px] ml-[62px] sm:ml-[72px] md:ml-[82px]">
                <div className="flex justify-center items-start w-full px-[6px] sm:px-[7px] md:px-[8px]">
                  <div className="flex flex-col justify-start items-center w-full mt-[6px] sm:mt-[7px] md:mt-[8px]">
                    <h1 className="text-[36px] sm:text-[42px] md:text-[48px] font-bold leading-[41px] sm:leading-[48px] md:leading-[54px] text-center text-[#111111] font-['Philosopher'] w-auto">
                      Contact Us
                    </h1>
                    <Image
                      src="/images/img_vector_smart_object.png"
                      alt="Decorative Line"
                      width={240}
                      height={14}
                      className="w-[180px] h-[11px] sm:w-[210px] sm:h-[12px] md:w-[240px] md:h-[14px] mt-[16px] sm:mt-[19px] md:mt-[21px]"
                    />
                    <p className="text-[15px] sm:text-[18px] md:text-[20px] font-normal leading-[18px] sm:leading-[21px] md:leading-[24px] text-center text-[#6d6d6d] font-['Lato'] w-auto mt-[16px] sm:mt-[19px] md:mt-[21px]">
                      Connect with 33KotiDham for spiritual guidance and support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Content */}
      <section className="w-full py-[40px] sm:py-[50px] md:py-[60px] px-[20px] sm:px-[40px] md:px-[60px]">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-8 text-left">
            
            {/* Introduction */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Get in Touch
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                At 33KotiDham, we are here to assist you with your spiritual journey. Whether you have questions about our puja services, astrological consultations, or spiritual products, our team is ready to help. Reach out to us through the form below or contact us directly.
              </p>
            </div>

            {/* Contact Form */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Contact Form
              </h2>
              <form onSubmit={handleSubmit} className="bg-[#fff3ee] p-6 rounded-lg border border-[#f37335]/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border border-[#f37335]/30 rounded-md p-2 text-[14px] sm:text-[16px] md:text-[18px] font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#f37335]"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border border-[#f37335]/30 rounded-md p-2 text-[14px] sm:text-[16px] md:text-[18px] font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#f37335]"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="phone" className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border border-[#f37335]/30 rounded-md p-2 text-[14px] sm:text-[16px] md:text-[18px] font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#f37335]"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="message" className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="border border-[#f37335]/30 rounded-md p-2 text-[14px] sm:text-[16px] md:text-[18px] font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#f37335]"
                    placeholder="Enter your message or query"
                  />
                </div>
                <div className="flex justify-center mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[14px] sm:leading-[15px] md:leading-[17px] text-center capitalize text-white bg-[linear-gradient(0deg,#f4aa36_0%,_#f37335_100%)] rounded-[22px] px-[25px] sm:px-[30px] md:px-[34px] py-[9px] sm:py-[11px] md:py-[12px] font-['Lato']"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Contact Information
              </h2>
              <div className="bg-[#fff3ee] p-6 rounded-lg border border-[#f37335]/20">
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-2">
                  <strong>Company:</strong> Aardhya Pooja Private Limited
                </p>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-2">
                  <strong>Email:</strong> <a href="mailto:info@33kotidham.com" className="text-[#f37335] hover:underline">info@33kotidham.com</a>
                </p>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-2">
                  <strong>WhatsApp:</strong> Message “Support” with your query or Order ID
                </p>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  Our team is available to assist you with any inquiries related to our services, including puja bookings, astrological consultations, or product orders. We aim to respond within 24-48 hours.
                </p>
              </div>
            </div>

            {/* Back to Home Button */}
            <div className="flex justify-center mt-8">
              <Button
                variant="primary"
                size="md"
                className="text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[14px] sm:leading-[15px] md:leading-[17px] text-center capitalize text-white bg-[linear-gradient(0deg,#f4aa36_0%,_#f37335_100%)] rounded-[22px] px-[25px] sm:px-[30px] md:px-[34px] py-[9px] sm:py-[11px] md:py-[12px] font-['Lato']"
                onClick={handleBackToHome}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;