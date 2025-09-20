'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

const TermsOfUsagePage: React.FC = () => {
  const router = useRouter();

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
                      Terms of Usage
                    </h1>
                    <Image
                      src="/images/img_vector_smart_object.png"
                      alt="Decorative Line"
                      width={240}
                      height={14}
                      className="w-[180px] h-[11px] sm:w-[210px] sm:h-[12px] md:w-[240px] md:h-[14px] mt-[16px] sm:mt-[19px] md:mt-[21px]"
                    />
                    <p className="text-[15px] sm:text-[18px] md:text-[20px] font-normal leading-[18px] sm:leading-[21px] md:leading-[24px] text-center text-[#6d6d6d] font-['Lato'] w-auto mt-[16px] sm:mt-[19px] md:mt-[21px]">
                      Terms governing your use of 33KotiDham services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms of Usage Content */}
      <section className="w-full py-[40px] sm:py-[50px] md:py-[60px] px-[20px] sm:px-[40px] md:px-[60px]">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-8 text-left">
            
            {/* Introduction */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Introduction
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                These Terms of Usage govern your use of the content and services offered by Aardhya Pooja Private Limited through <a href="https://www.33kotidham.com" className="text-[#f37335] hover:underline">https://www.33kotidham.com</a> and the 33KotiDham mobile application (collectively referred to as "33KotiDham," "we," "us," or "our").
              </p>
            </div>

            {/* Updation of Terms */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Updation of Terms
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                We may update or modify these Terms from time to time. It is your responsibility to review them periodically. Continued use of the Website or App implies your acceptance of the updated terms.
              </p>
            </div>

            {/* User Consent */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                User Consent
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                By accessing or using 33KotiDham, you ("User," "Member") agree to these Terms unconditionally. If you do not agree, please do not click “I AGREE” or use the platform. Your continued usage signifies legal acceptance.
              </p>
            </div>

            {/* General Description */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                General Description
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-4">
                33KotiDham offers astrological content, consultations, puja bookings, Chadawa, and spiritual products via web, app, and other electronic media. Services include:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <li><strong>Free Services:</strong> Accessible without registration</li>
                <li><strong>Paid Services:</strong> Require registration and accurate personal information</li>
              </ul>
            </div>

            {/* Registration & Eligibility */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Registration & Eligibility
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <li>You must be legally capable of entering contracts under the Indian Contract Act, 1872</li>
                <li>Minors under 18 must use the platform only under legal guardian supervision</li>
                <li>You agree to provide accurate, current, and complete registration data</li>
                <li>Multiple accounts using different mobile numbers are prohibited</li>
                <li>33KotiDham reserves the right to suspend or terminate accounts with false or incomplete data</li>
              </ul>
            </div>

            {/* Account Security */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Account Security
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                You are responsible for maintaining the confidentiality of your login credentials. 33KotiDham is not liable for any loss due to unauthorized access. Notify us immediately of any breach or misuse.
              </p>
            </div>

            {/* Third-Party Services */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Third-Party Services
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                Some services may be provided by third-party providers. 33KotiDham is not responsible for third-party content or outcomes. Personal data shared with third-party providers is at your own risk.
              </p>
            </div>

            {/* Payment & Data Risks */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Payment & Data Risks
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                Online payments may be vulnerable to misuse or fraud. 33KotiDham and its payment partners are not liable for such risks.
              </p>
            </div>

            {/* Service Restrictions */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Service Restrictions
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-4">
                You may not use 33KotiDham if:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <li>You reside in a jurisdiction that prohibits such services</li>
                <li>You are restricted by law, treaty, or religious practice</li>
                <li>You have created multiple active accounts</li>
                <li>You use the “Call with Astrologer” feature and consent to receive calls even if your number is registered under DND</li>
              </ul>
            </div>

            {/* Website Content & Conduct */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Website Content & Conduct
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                All content is proprietary and must be used respectfully. You may not post unlawful, abusive, or offensive material. 33KotiDham reserves the right to suspend or terminate access for violations.
              </p>
            </div>

            {/* Medical Disclaimer */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Medical Disclaimer
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                Astrological advice is not a substitute for medical consultation. 33KotiDham does not guarantee results or outcomes from services. Use of services is at your own discretion and risk.
              </p>
            </div>

            {/* Legal Remedies */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Legal Remedies
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                Any legal claims must be directed to the specific third party responsible. 33KotiDham is not liable for actions or omissions of service providers.
              </p>
            </div>

            {/* Account Access & Monitoring */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Account Access & Monitoring
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                33KotiDham may access user accounts to ensure service quality and resolve complaints. Refer to our Privacy Policy for details on data handling.
              </p>
            </div>

            {/* Privacy Policy */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Privacy Policy
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                By using 33KotiDham, you confirm that you have read and accepted our Privacy Policy, including any updates.
              </p>
            </div>

            {/* Breach & Termination */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Breach & Termination
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-4">
                33KotiDham reserves the right to modify, suspend, or terminate any service or user account without prior notice. Violation of these Terms of Usage may lead to immediate cancellation of registration and access. Termination may occur if:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <li>Registration data is unverifiable, misleading, or incomplete</li>
                <li>User actions may cause legal liability to 33KotiDham or its partners</li>
                <li>User interferes with other users or violates 33KotiDham’s privacy policy</li>
              </ul>
            </div>

            {/* For Service Providers (Astrologers) */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                For Service Providers (Astrologers)
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                Your relationship with 33KotiDham is limited to being a listed member. 33KotiDham may deactivate your profile for any violation of these Terms or the Service Agreement.
              </p>
            </div>

            {/* Delivery, Cancellation & Refund Policy */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Delivery, Cancellation & Refund Policy
              </h2>
              <div className="mb-6">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  Reports & Consultations
                </h3>
                <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  <li>No refunds will be issued once the order reaches the “Processing” stage</li>
                  <li>Cancellation is allowed only within one hour of payment and is subject to 33KotiDham’s discretion</li>
                  <li>No refunds for incorrect data</li>
                  <li>Requests to correct data must be made within one hour</li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  Call with Astrologer
                </h3>
                <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  <li>No refunds for missed calls due to incorrect contact number, poor signal, or user unavailability</li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  Product Orders
                </h3>
                <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  <li>No refunds for damaged products post-delivery</li>
                  <li>Refunds may be considered only if damage occurs during transit</li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  Technical Issues
                </h3>
                <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  <li>No refunds for delays or glitches</li>
                  <li>Refunds for duplicate payments will be processed after retaining one valid transaction</li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  Refund Deductions
                </h3>
                <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  <li>Refunds, if approved, will be credited to the user’s 33KotiDham wallet</li>
                  <li>Deductions may apply for payment gateway charges, shipping, customs, or processing costs</li>
                </ul>
              </div>
            </div>

            {/* Quality Audit for Consultations */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Quality Audit for Consultations
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-4">
                Refunds may be considered only in specific cases such as:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <li>Network issues</li>
                <li>Language mismatch</li>
                <li>Excessive delay</li>
                <li>Irrelevant responses</li>
              </ul>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mt-4">
                No refunds for lack of accuracy in predictions. 33KotiDham does not guarantee outcomes. Refunds are reviewed within 72 hours and, if approved, credited to 33KotiDham wallet.
              </p>
            </div>

            {/* User Obligations */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                User Obligations
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-4">
                All users must comply with 33KotiDham’s Terms and Privacy Policy. Registration confirms individual use, not on behalf of an entity. Users must not:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <li>Post false, offensive, or abusive content</li>
                <li>Promote intolerance</li>
                <li>Share unauthorized content</li>
                <li>Violate intellectual property</li>
                <li>Harvest data, spam, or upload malware</li>
                <li>Engage in unauthorized access or commercial resale</li>
              </ul>
            </div>

            {/* General Conduct */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                General Conduct
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                Users agree to receive communication via email, SMS, WhatsApp, or app. Any abuse or misuse must be reported. False complaints may lead to termination. 33KotiDham may block users for misconduct.
              </p>
            </div>

            {/* Disciplinary Action */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Disciplinary Action
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                33KotiDham may issue warnings or bans for violations. Wallet balances may be refunded after deducting applicable charges.
              </p>
            </div>

            {/* Bank Account Information */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Bank Account Information
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                Users must provide accurate banking details. 33KotiDham is not responsible for failed transactions due to incorrect or insufficient details.
              </p>
            </div>

            {/* Payment Terms */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Payment Terms
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                Users must own the provided card/bank account and ensure sufficient funds are available.
              </p>
            </div>

            {/* User Responsibility */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                User Responsibility
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                Users confirm authorization to use payment methods. 33KotiDham is not liable for failed transactions.
              </p>
            </div>

            {/* Legal Validity */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Legal Validity
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                If any term is found invalid, it will be replaced by a lawful one that matches the original intent. The rest of the terms remain effective.
              </p>
            </div>

            {/* Disclaimer, Limitation of Liability & Warranty */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Disclaimer, Limitation of Liability & Warranty
              </h2>
              <div className="mb-4">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  Nature of Services
                </h3>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  33KotiDham provides spiritual guidance through astrologers. Results may vary.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  No Warranty
                </h3>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  33KotiDham makes no guarantees for accuracy, reliability, or suitability of services. Everything is provided “as is.”
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  User Responsibility
                </h3>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  Users must disclose personal health issues and accept risks in using services or downloads.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  Platform Limitations
                </h3>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  33KotiDham is not responsible for delays, maintenance downtime, or service interruptions.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  Consultant Disclaimer
                </h3>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  Astrologers are not employees of 33KotiDham. Advice given is not guaranteed.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  Mental Health Disclaimer
                </h3>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  33KotiDham is not a mental health service. For emergencies, contact helplines like AASRA (912227546669).
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  Financial & Technical Liability
                </h3>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  33KotiDham is not liable for unauthorized account use or indirect damages. Refunds are limited to the service amount.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  Indemnification
                </h3>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  Users agree to indemnify 33KotiDham and its affiliates from claims arising from service use or policy violations.
                </p>
              </div>
            </div>

            {/* Proprietary Rights to Content */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Proprietary Rights to Content
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                All content on 33KotiDham is protected by intellectual property laws. Users may not reproduce or distribute content without permission. Third-party content is not claimed by 33KotiDham and disputes must be directed accordingly.
              </p>
            </div>

            {/* Notices */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Notices
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                Official notices must be in writing and sent via email. Notices are considered received 24 hours after email delivery.
              </p>
            </div>

            {/* Governing Law & Jurisdiction */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Governing Law & Jurisdiction
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                Disputes are subject to arbitration under Indian law in Indore. Both parties agree to a sole arbitrator and English as the language. Legal relief can be sought in Indore courts. Costs up to ₹1,00,000 can be recovered if arbitration clause is breached.
              </p>
            </div>

            {/* Entire Agreement */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Entire Agreement
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                These Terms represent the full agreement between the user and 33KotiDham. Any waiver must be in writing and signed by 33KotiDham.
              </p>
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
                  <strong>Email:</strong> info@33kotidham.com
                </p>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  Official notices must be in writing and sent via email. Notices are considered received 24 hours after email delivery.
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Disclaimer
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                Puja, astrology, and religious services are spiritual in nature. 33KotiDham and its team act as facilitators and do not guarantee results. Effectiveness depends on belief and karmic factors. 33KotiDham is not liable for outcomes.
              </p>
            </div>

            {/* Effective Date */}
            <div className="terms-section border-t pt-6">
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#666666] font-['Lato'] italic">
                These Terms of Usage are effective as of January 2024 and represent the complete agreement between users and Aardhya Pooja Private Limited.
              </p>
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

export default TermsOfUsagePage;