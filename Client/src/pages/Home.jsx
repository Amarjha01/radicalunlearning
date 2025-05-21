import Hero from "../components/Home/Hero";
import TestimonialCarousel from "../components/Global/TestimonialCarousel";
import RediscoverCards from "../components/Home/RediscoverCards";
import Features from "../components/Home/Features";
import DynamicRadioContent from "../components/Home/DynamicRadioContent";
import { FaLightbulb } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { showSuccessToast, showErrorToast , showAccessDeniedToast, showSecurityAlertToast } from "../utils/Notification.jsx";

const Home = () => {

  const offer = [
    {img:'/offers/offer1.webp', title: 'For Learners (12+)' , points:['Access to a pool of Experts and Coaches fully trained in Radical Unlearning framework ensuring your learning is in-depth and effective', 'Access to learning resources i.e. webinars, posts, learnings resources', 'Platform to network with other learners', 'AI tools will be offered gradually to support self-learning' , 'Ability to store your learning portfolios and evidence of learning', 'Internships and practical experience opportunities offered by the community']},
    {img:'/offers/offer2.webp', title: 'For Educators & Parents' , points:['Coaching you to adopt the Radical Unlearning framework through webinars, meetings, learning resources and more', 'Registering your profiles for learners to reach out to you for paid/unpaid sessions as an Expert in a subject area or a general Coach', 'Conversation with you to understand how you could offer your experience and expertise for the benefit of the community', 'Reference checks and due diligence for interacting with underage learners, where possible', 'Platform to network with other educators and parents to exchange ideas']}, 
    {img:'/offers/offer3.webp', title: 'For Others in Learning Community' , points:['Knowledge sharing through dedicated webinars and meet-ups', 'Industry to offer internships, sponsorships and learning opportunities for our learners', 'Special guests invited to offer their expertise through talks and webinars']},
  ]
  const handleNotification = () => {
    showSuccessToast("This is a success notification!");
    showErrorToast("This is an error notification!");
    showAccessDeniedToast("This is an access denied notification!");
    showSecurityAlertToast("This is a security alert notification!");
  };
  return (
    <div>
<button onClick={handleNotification} >
  noti
</button>
        <div className=" w-full flex flex-col items-center justify-center px-4 md:px-20 py-5 ">
      <img src="/logo.webp" alt="" className="h-full z-50 cursor-pointer  "/>
      <div className={` text-md md:text-xl lg:text-2xl font-semibold uppercase anta-regular cursor-pointer z-20  text-[#575757]`}>
       <span className=" block">Radical Unlearning </span>
       <span className=" block translate-x-[50%]">- A revolution in education</span>
      </div>
    </div>
    <div className="max-w-4xl mx-auto my-16 px-6 sm:px-10 py-10 bg-[#b4c0b2] rounded-xl shadow-md">
      
      <div className="flex items-center mb-6">
        <FaLightbulb className="text-[#faf3dd] text-3xl mr-3" />
        <h2 className="text-3xl font-semibold text-gray-800">
          About Radical Unlearning
        </h2>
      </div>
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        We are parents and were students who have experienced the drawbacks of mainstream education: too much emphasis on learning measurement, flawed measurement techniques, carrot/stick approach, focus on memorisation, limited exploration through questioning, intense pressure of competition & many more…
      </p>
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        So, we have created a framework and platform for like-minded people—mainly unschooling parents and homeschoolers in the learning community—who would like to support our principles of open, enjoyable, and effective learning.
      </p>
      <p className="text-gray-700 text-lg leading-relaxed">
        The framework offers essential principles of learning, tools to access resources, collaborate, and contribute towards learning.
      </p>
    </div>
    <div className="py-20 w-full flex flex-col items-center justify-center px-4 md:px-20">
  <h2 className="text-3xl font-bold text-center mb-6  anta-regular">
    🎥 Our Framework
  </h2>

<figure>
    <video src="/RadicalUnlearningIntro.mp4" width={'full'} controls>
    </video>
  </figure>
</div>
<div>
   <h2 className="text-3xl font-bold text-center mb-6  anta-regular">
     What we offer
  </h2>
<div className="flex flex-col md:flex-row justify-around max-w-[90vw] mx-auto gap-10 ">
  {offer.map((item, index) => (
    <div key={index} className="flex flex-col items-center text-start md:w-[30vw]">
      <img src={item.img} alt={item.title} className="h-60 object-cover mb-4" />
      <h3 className="text-lg font-semibold py-6 text-start">{item.title}</h3>
      <ol className="list-decimal list-inside font-semibold">
        {item.points.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ol>
    </div>
  ))}
</div>

</div>
      {/* <Hero /> */}
      {/* <RediscoverCards  /> */}
      {/* <Features /> */}
      {/* <DynamicRadioContent /> */}
      {/* <TestimonialCarousel /> */}
    </div>
  );
};

export default Home;
