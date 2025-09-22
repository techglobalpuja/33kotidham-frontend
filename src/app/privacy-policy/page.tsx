'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

const PrivacyPolicyPage: React.FC = () => {
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
                      Privacy Policy
                    </h1>
                    <Image
                      src="/images/img_vector_smart_object.png"
                      alt="Decorative Line"
                      width={240}
                      height={14}
                      className="w-[180px] h-[11px] sm:w-[210px] sm:h-[12px] md:w-[240px] md:h-[14px] mt-[16px] sm:mt-[19px] md:mt-[21px]"
                    />
                    <p className="text-[15px] sm:text-[18px] md:text-[20px] font-normal leading-[18px] sm:leading-[21px] md:leading-[24px] text-center text-[#6d6d6d] font-['Lato'] w-auto mt-[16px] sm:mt-[19px] md:mt-[21px]">
                      Privacy guidelines for 33KotiDham services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="w-full py-[40px] sm:py-[50px] md:py-[60px] px-[20px] sm:px-[40px] md:px-[60px]">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-8 text-left">
            
            {/* Introduction */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Introduction
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <a href="https://www.33kotidham.com" className="text-[#f37335] hover:underline">https://www.33kotidham.com</a> (“A product of Aardhya Pooja Private Limited”) is committed to protecting the privacy of the users of the website (including astrologers and buyers/customers, whether registered or not). Please read this privacy policy carefully to understand how the website is going to use the information supplied by you to the Website.
              </p>
            </div>

            {/* User’s Consent */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                User’s Consent
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                This Privacy Policy, which may be updated/amended from time to time, deals with the information collected from its users in the form of personal identification, contact details, birth details, and any forecast made using the supplied information and how such information is further used for the purposes of the Website. By accessing the website and using it, you indicate that you understand the terms and expressly consent to the privacy policy of this website. If you do not agree with the terms of this privacy policy, please do not use this website.
              </p>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mt-4">
                Your continued use of this website shall confirm that you have provided your unconditional consent and confirm to the terms of this privacy policy as regards collecting, maintaining, using, processing, and disclosing your personal and other information in accordance with this Privacy Policy.
              </p>
            </div>

            {/* Information Collected by Website */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Information Collected by Website
              </h2>
              
              <div className="mb-6">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  Personal Identifiable Information
                </h3>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  The information qualifies as personal in nature when the information collected identifies a specific end user. Such information would be collected by the website during the following actions:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mt-4">
                  <li><strong>Creating an account / Registration data:</strong> While accessing the Website, the User may be required to create an account. The personal information which may be sought includes, but is not limited to, Full name, Address, Telephone Number, Email-address, Date of Birth, Gender, Location, Photograph, any other items of ‘sensitive personal data or information’ as defined under the Information Technology (Reasonable Security Practices And Procedures And Sensitive Personal Data Of Information) Rules, 2011, enacted under the Information Technology Act, 2000, and any other detail required during registration. The e-mail address or phone number, together with a password or OTP, is used to secure the User’s profile and for effective implementation of personalized Email and SMS Services provided by the Website. In the event that no registration is made, the Website may not be able to provide services due to non-availability of personal identifiable information.</li>
                  <li><strong>Booking a paid service:</strong> While booking a service through Order Form, the personal information may include, but is not limited to, the information mentioned above, financial information including bank account information, credit card or debit card details, or other payment instrument details through a secure third-party gateway, IP (Internet protocol) Address, and any other information provided during booking a paid service. Such information is kept highly confidential.</li>
                  <li><strong>Log Files, IP Address, and Cookies:</strong> The website collects information stored by your browser on your computer’s hard drive (cookies). It further automatically logs generic information about the user’s computer connection to the Internet (Session Data). The website may store temporary or permanent ‘cookies’ on the user’s computer to recognize the user’s computer each time they return, including the time and date of the visit, pages viewed, time spent, and to verify registration or password information. Users may block cookies, but this may prevent the use of certain website features. Cookies are used to personalize the user’s experience and display advertisements according to preferences.</li>
                  <li><strong>Third-Party Platforms:</strong> Some services may direct the User to third-party platforms. Information provided on such platforms is governed by their privacy policies. 33KotiDham disclaims any liability arising from the use/misuse of such information shared with third parties.</li>
                  <li><strong>User Feedback and Public Content:</strong> We collect details including, but not limited to, User feedback, comments, etc., disclosed on articles, blogs, groups, forums, or other pages. Users are advised to exercise discretion before disclosing such information, as it is in the public domain and susceptible to misuse.</li>
                  <li><strong>Miscellaneous Activities:</strong> The Website may collect other mandatory information or receive information via email or other methods, including contracts for specific services or products. Such information may not be part of the User-Member’s Profile but will be used to address specific needs or concerns.</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#111111] font-['Philosopher'] mb-3">
                  Non-Personal Identifiable Information
                </h3>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  The information qualifies as non-personal when it does not identify a specific end user. Such information is collected when the user visits the Website and includes, but is not limited to:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mt-4">
                  <li>URL of the previous website visited before this website or the URL of the website visited after.</li>
                  <li>Internet service provider / IP Address / Telecom service provider.</li>
                  <li>Geographical Location.</li>
                </ul>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mt-4">
                  Such non-personal identifiable information is used for purposes including, but not limited to, troubleshooting connection problems, administering the website, analyzing trends, gathering demographic information, monitoring frequency of visits, average length of visits, pages viewed, compliance with applicable law, and cooperating with law enforcement activities.
                </p>
              </div>
            </div>

            {/* User Representation */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                User Representation
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                The User hereby represents and confirms that the information provided to the Website is authentic, correct, current, and updated. 33KotiDham and its entities shall not be responsible for the authenticity of the information provided. The User shall be personally liable and indemnify the Website for any breach of this provision.
              </p>
            </div>

            {/* Security Measures */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Security Measures
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                The security of the personal information supplied by the User is very important to 33KotiDham. The Website takes various measures, including physical and electronic security measures, to guard against unauthorized access to the information. Personal information is collected on a secured server, and payment details are entered on a secured SSL page of the Payment Gateway or Bank, with data transferred in an encrypted manner. However, no data transmission can be guaranteed to be completely secure. Users are advised to take precautions against sharing details submitted on the Website, including login details. 33KotiDham is not responsible for the security or confidentiality of communications sent via email or other internet methods.
              </p>
            </div>

            {/* Usage of Information */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Usage of Information
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-4">
                The information collected by the Website may be used for purposes permissible under applicable law, including but not limited to:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <li>Providing a personalized browsing experience, using personal information for research, improving marketing and promotional efforts, analyzing usage, improving content, product offerings, and customizing the Website’s layout.</li>
                <li>Using IP tracking details and Cookies data to facilitate website usage and provide a personalized experience, without providing sensitive information to third parties without User consent.</li>
                <li>Retaining information, including Personal Information and User Data, for purposes such as compliance with statutory or legal obligations, tax laws, evidentiary purposes, and managing access and use of services or resolving disputes.</li>
                <li>Using data from cookies, log files, device identifiers, location data, and clear gifs to remember information, provide personalized content and advertising, monitor service effectiveness, track visitor metrics, diagnose technology problems, and enhance services.</li>
                <li>Using third-party analytics tools to measure traffic and usage trends, collecting non-personal information from the User’s device to improve services, stored as anonymized logs.</li>
              </ul>
            </div>

            {/* Confidentiality */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Confidentiality
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-4">
                33KotiDham aspires to protect all information provided by its Users that may be termed as confidential. Such confidential information not required to be disclosed is excluded from the definition of Personal Information and shall not be collected or used. Confidential information shall not be disclosed or shared by 33KotiDham, its employees, agents, or third-party contractors, except under the following circumstances:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <li>If 33KotiDham believes there is a significant/real/imminent threat or risk to the User’s health, safety, or life, or to that of any other person or the public.</li>
                <li>If such information must be shared in accordance with the law, including investigations, court summons, or judicial proceedings.</li>
                <li>To protect and defend the rights or property of 33KotiDham.</li>
              </ul>
            </div>

            {/* Children Privacy Policy */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Children Privacy Policy
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                Our website is intended for users who are 18 years of age or older, and we do not intentionally collect personal identifiable information from individuals under 18. The website is not designed to attract or be used by those under 18. If you are under 18, please refrain from using our services. If a parent or guardian becomes aware of any information shared about a child under 18, please contact us promptly at <a href="mailto:info@33kotidham.com" className="text-[#f37335] hover:underline">info@33kotidham.com</a>. We will take immediate steps to remove such data from our systems. Your privacy and the protection of young users are of utmost importance to us.
              </p>
            </div>

            {/* Safety and Security */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Safety and Security
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                33KotiDham honors users’ privacy and employs best practices to secure personal details, such as birth details and addresses, and financial details, such as credit card or debit card transaction details. 33KotiDham uses the best encryption methodologies to ensure secure transactions and encourages clients to use their credit/debit cards with full confidence, striving to make their experience safe and secure.
              </p>
            </div>

            {/* Grievance Officer */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Grievance Officer
              </h2>
              <div className="bg-[#fff3ee] p-6 rounded-lg border border-[#f37335]/20">
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato'] mb-2">
                  <strong>Email:</strong> <a href="mailto:info@33kotidham.com" className="text-[#f37335] hover:underline">info@33kotidham.com</a>
                </p>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                  The Grievance Officer is appointed in accordance with the Information Technology Act 2000 and rules made thereunder. The Officer can be contacted for any discrepancies found on the website, breaches of Terms of Use, Privacy Policy, or other policies, or any other complaints or concerns.
                </p>
              </div>
            </div>

            {/* Compliance Statement */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Compliance Statement
              </h2>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                This Privacy Policy is published in accordance with Rule 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011 and Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, which require publishing of the Privacy Policy for collection, use, storage, and transfer of sensitive personal data or information.
              </p>
            </div>

            {/* Effective Date */}
            <div className="terms-section border-t pt-6">
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#666666] font-['Lato'] italic">
                This Privacy Policy is effective as of January 2024 and represents the complete agreement between users and Aardhya Pooja Private Limited regarding the collection, use, and protection of personal information.
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

export default PrivacyPolicyPage;