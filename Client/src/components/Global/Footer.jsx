import { FaInstagram, FaFacebookF, FaYoutube, FaEnvelope, FaPhoneAlt, FaRobot } from 'react-icons/fa';

const Footer= () =>  {
  return (
    <footer className="anta-regular text-white px-8 py-10 rounded-t-2xl">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="text-center lg:text-left space-y-2">
          <h3 className="text-xl font-semibold">Radical Unlearning</h3>
          <p className="text-sm">Empowering learners and educators with a flexible, self-directed learning</p>
          <div className="text-sm space-x-2 mt-2">
            <a href="#" className="hover:underline">About Us</a> |
            <a href="#" className="hover:underline"> For Learners</a> |
            <a href="#" className="hover:underline"> For Educators</a> |
            <a href="#" className="hover:underline"> Blog</a> |
            <a href="#" className="hover:underline"> Terms & Conditions</a> |
            <a href="#" className="hover:underline"> Privacy</a>
          </div>
          <div className="flex gap-4 justify-center lg:justify-start mt-4 text-xl">
            <a href="https://www.instagram.com/radicalunlearning/"><FaInstagram /></a>
            <a href="https://www.facebook.com/profile.php?id=61573197735821"><FaFacebookF /></a>
            <a href="https://www.youtube.com/@Radical-Unlearning"><FaYoutube /></a>
          </div>
          <p className="text-xs mt-4">© 2025 Radical Unlearning. All rights reserved.</p>
        </div>

        <div className="space-y-4 text-center lg:text-left">
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <FaPhoneAlt />
            <a href="tel:+44 7557 201060" className="hover:underline">+44 7557 201060</a>
          </div>
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <FaEnvelope />
            <a href="mailto:support@example.com" className="hover:underline">help@radicalunlearning.com</a>
          </div>
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <FaRobot />
            <span>Help with Chat Bot</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer