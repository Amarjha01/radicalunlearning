import { FaUserFriends, FaBookOpen, FaLock } from 'react-icons/fa';

export default function MissionTeamPolicy() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 bg-[#1e293b] text-white p-8 rounded-4xl my-5">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Our Mission & Story</h2>
        <p className="text-lg text-gray-300">
          At Radical Unlearning, we believe education isn’t about memorization—it’s about exploration, curiosity, and growth. Our platform empowers learners, parents, and educators to break free from traditional models and embrace a self-directed, meaningful learning experience. Join us in redefining education for a future that’s flexible, engaging, and truly empowering!
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <FaUserFriends className="text-2xl" /> Meet the Team
        </h2>
        <p className="text-lg text-gray-300">
          Behind every great movement is a team of visionaries, educators, and innovators. At Radical Unlearning, our passionate experts are dedicated to reshaping the learning experience—bringing knowledge, mentorship, and guidance to those ready to think beyond boundaries. Meet the minds fueling this educational revolution!
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <FaBookOpen className="text-2xl" /> Terms & Conditions
        </h2>
        <p className="text-lg text-gray-300">
          By using Radical Unlearning, you agree to a safe, inclusive, and respectful learning environment. Our terms outline user responsibilities, subscription details, and content policies to ensure a seamless and trustworthy experience for all. Stay informed—read our full terms before you begin your journey with us!
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <FaLock className="text-2xl" /> Privacy Policy
        </h2>
        <p className="text-lg text-gray-300">
          Your privacy matters. At Radical Unlearning, we prioritize data protection, security, and transparency. Your personal information is safeguarded and used only to enhance your learning experience. Read our Privacy Policy to understand how we protect what matters most—your trust.
        </p>
      </div>
    </div>
  );
}
