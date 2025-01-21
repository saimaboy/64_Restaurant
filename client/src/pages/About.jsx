import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 p-10 min-h-screen">
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-cursive font-bold mb-8">About Us</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Welcome to our restaurant! We are passionate about creating a memorable dining experience
            with delicious food, warm hospitality, and an inviting atmosphere. Here's our story.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Story Section */}
            <div>
              <img
                src="https://cdn.prod.website-files.com/6254ae25c3e3a2cdc526ebaf/665a1231127bcf36eec7ed73_restaurant-employee-training-roles-header.jpg"
                alt="Our Story"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-4">Our Story</h3>
              <p className="text-gray-700 mb-4">
                Established in 2005, our restaurant has been serving mouthwatering dishes inspired by global cuisines.
                From humble beginnings, we’ve grown to become a beloved destination for food lovers in the community.
              </p>
              <p className="text-gray-700">
                We pride ourselves on sourcing fresh, locally-sourced ingredients to create meals that delight
                the senses. Whether you're here for a family gathering, a romantic date, or a casual night out, we're here to serve you!
              </p>
            </div>
          </div>
          <div className="mt-16">
            {/* Mission and Values */}
            <h3 className="text-2xl font-bold mb-4">Our Mission & Values</h3>
            <p className="text-gray-700 mb-4">
              Our mission is to bring people together through food. We believe in:
            </p>
            <ul className="list-disc text-left text-gray-700 max-w-xl mx-auto">
              <li className="mb-2">Serving fresh, high-quality, and delicious dishes.</li>
              <li className="mb-2">Creating a welcoming and inclusive environment.</li>
              <li className="mb-2">Supporting local farmers and sustainable practices.</li>
              <li className="mb-2">Delivering exceptional customer service.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
