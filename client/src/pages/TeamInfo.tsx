import { motion } from 'framer-motion';
// import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const TeamSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <motion.section
        className="text-center py-20 bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded-lg shadow-xl mb-12"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        ref={ref}
      >
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
          Meet the Dream Team Behind <span className="text-yellow-300">Collaborative Code Compiler</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed">
        OverClockers has developed a collaborative code compiler that features real-time chat, an interactive whiteboard, and support for a wide range of programming languages, making it a powerful tool for seamless coding and collaboration.
        </p>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="mb-16"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={staggerChildren}
        ref={ref}
      >
        <motion.h2 className="text-5xl font-bold text-center mb-10 text-white" variants={fadeInUp}>
         Over<span className='text-red-800'>Clockers</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: 'Wahid Patel',
              role: 'Lead Developer',
              skills: 'Leadership Skills and a Frontend Developer',
              description:
                'Wahid is the one to take the lead on the project and guide everyone. He is the guy with good speaking skills and a knack knowledge of everything',
              image: 'wahid-web.png',
            },
            {
              name: 'Shoaib Khan',
              role: 'Full Stack Developer',
              skills: 'Frontend as well as Backend',
              description:
                'The guy behind mastery of Frontend as well as Backend leading the team to finals. Mastery of all programming languages with full access to the project, capable of implementing any functionality as envisioned.',
              image: 'https://via.placeholder.com/150',
            },
            {
              name: 'Sofiya Patwekar',
              role: 'Backend Developer',
              skills: 'Java Python & Nodejs',
              description:
                'The backbone of the system, effortlessly handling business logic and server-side operations without a flinch. A crucial force in the team, ensuring everything runs smoothly behind the scenes.',
              image: 'https://via.placeholder.com/150',
            },
            {
              name: 'Alisha Shaikh',
              role: 'Project Manager',
              skills: 'Documentation and UI/UX Developer',
              description:
                'Makes the website look cooler and has all the ppt expertise.Crafts clear, concise, and comprehensive documentation, ensuring seamless onboarding for developers and users. ',
              image: 'kashmiri_photo.jpg',
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition duration-300"
              variants={fadeInUp}
            >
              <img 
  src={member.image} 
  alt={member.name} 
  className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 mx-auto"/>

              <p className="text-blue-600 font-medium">{member.role}</p>
              <p className="text-gray-500 italic text-sm">{member.skills}</p>
              <p className="text-gray-700 mt-4 text-sm leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call-to-Action */}
      <motion.section
        className="text-center bg-gray-100 py-16 rounded-xl shadow-md"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={fadeInUp}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About the Journey</h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-6">
        We’re incredibly proud of what we’ve built together, but this is just the beginning. Through collaboration and teamwork, we’ll continue to innovate and improve. Stay tuned for exciting updates
        </p>
        
      </motion.section>
    </div>
  );
};

export default TeamSection;
