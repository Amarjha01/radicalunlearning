import Hero from "../components/Home/Hero";
import TestimonialCarousel from "../components/Global/TestimonialCarousel";
import RediscoverCards from "../components/Home/RediscoverCards";
import Features from "../components/Home/Features";
import DynamicRadioContent from "../components/Home/DynamicRadioContent";
const Home = () => {

  const offer = [
    {img:'/offer1.webp', title: 'For Learners (12+)' , points:['Access to a pool of Experts and Coaches fully trained in Radical Unlearning framework ensuring your learning is in-depth and effective', 'Access to learning resources i.e. webinars, posts, learnings resources', 'Platform to network with other learners', 'AI tools will be offered gradually to support self-learning' , 'Ability to store your learning portfolios and evidence of learning', 'Internships and practical experience opportunities offered by the community']},
    {img:'/offer2.webp', title: 'For Educators & Parents' , points:['Coaching you to adopt the Radical Unlearning framework through webinars, meetings, learning resources and more', 'Registering your profiles for learners to reach out to you for paid/unpaid sessions as an Expert in a subject area or a general Coach', 'Conversation with you to understand how you could offer your experience and expertise for the benefit of the community', 'Reference checks and due diligence for interacting with underage learners, where possible', 'Platform to network with other educators and parents to exchange ideas']}, 
    {img:'/offer3.webp', title: 'For Others in Learning Community' , points:['Knowledge sharing through dedicated webinars and meet-ups', 'Industry to offer internships, sponsorships and learning opportunities for our learners', 'Special guests invited to offer their expertise through talks and webinars']},
  ]

  return (
    <div>
    <div>
        <h2>About Radical Unlearning</h2>
      <p>
        We are parents and were students who have experienced the drawbacks of
        mainstream education: too much emphasis on learning measurement, flawed
        measurement techniques, carrot/stick approach, focus on memorisation,
        limited exploration through questioning, intense pressure of competition
        & many more…{" "}
      </p>
      <p>
        So, we have created a framework and platform for like-minded people
        mainly unschooling parents and homeschoolers in the learning community
        who would like to support our principles of open, enjoyable and
        effective learning.{" "}
      </p>
      <p>
        The framework offers essential principles of learning, tools to access
        resources, collaborate and contribute towards learning.
      </p>
    </div>
    <div className="py-20 w-full flex flex-col items-center justify-center px-4 md:px-20">
  <h2 className="text-3xl font-bold text-center mb-6  anta-regular">
    🎥 A Glimpse Into Our World
  </h2>

<figure>
    <video src="/RadicalUnlearningIntro.mp4" width={'full'} controls>
    </video>
  </figure>

  <p className="mt-6 max-w-xl text-center text-gray-700 italic text-base leading-relaxed">
    “Sometimes, the best learning begins when we let go of what we thought we knew.”
  </p>
</div>
<div>
  <h2>What we offer</h2>

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
