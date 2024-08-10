"use client";
import React from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us - ShopEase</title>
        <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/5.3.0/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container-fluid">
        <div className="row">
          {/* About Us Section */}
          <div className="col-12 p-4">
            <div className="text-center mb-5">
              <h1 className="display-4 font-weight-bold text-primary">About Us</h1>
              <p className="lead text-secondary">
                <strong>Welcome to ShopEase</strong>
              </p>
              <hr className="my-4 mx-auto" style={{ width: '60px', borderTop: '3px solid #ff6700' }} />
            </div>
            
            <div className="text-center mb-5">
              <p className="text-muted">
                At ShopEase, we strive to revolutionize the online shopping experience. Our goal is to provide a seamless, intuitive, and enjoyable shopping journey for users around the world. By leveraging cutting-edge technology, we aim to deliver an exceptional e-commerce platform that meets the diverse needs of our customers and sellers.
              </p>
            </div>

            <h2 className="text-center text-primary mb-4">Our Journey</h2>
            <div className="row">
              <div className="col-md-10 col-lg-8 mx-auto">
                <p className="text-muted mb-4">
                  The development of ShopEase has been a remarkable journey, driven by innovation and a commitment to excellence. Here's an overview of our development process:
                </p>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <div className="d-flex align-items-start">
                      <div className="me-3">
                        <i className="fas fa-check-circle text-success fs-3"></i>
                      </div>
                      <div>
                        <strong>Concept and Design:</strong> We started with a vision to create a user-friendly e-commerce platform. Our design team crafted intuitive interfaces to ensure a smooth user experience.
                      </div>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="d-flex align-items-start">
                      <div className="me-3">
                        <i className="fas fa-check-circle text-success fs-3"></i>
                      </div>
                      <div>
                        <strong>Front-End Development:</strong> Utilizing <strong>Next.js</strong> and <strong>React.js</strong>, we developed dynamic and responsive web pages. The use of server-side rendering and static site generation enhances our application's speed and SEO performance.
                      </div>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="d-flex align-items-start">
                      <div className="me-3">
                        <i className="fas fa-check-circle text-success fs-3"></i>
                      </div>
                      <div>
                        <strong>Back-End Development:</strong> Our server-side logic is powered by <strong>Node.js</strong>, ensuring efficient request handling and a smooth user experience. We also incorporated various APIs to fetch product data, manage categories, and integrate with external services.
                      </div>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="d-flex align-items-start">
                      <div className="me-3">
                        <i className="fas fa-check-circle text-success fs-3"></i>
                      </div>
                      <div>
                        <strong>Database Management:</strong> Leveraging <strong>MongoDB Atlas</strong>, we ensure scalable and reliable storage solutions. Our data-driven approach helps in making informed decisions and optimizing our strategies.
                      </div>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="d-flex align-items-start">
                      <div className="me-3">
                        <i className="fas fa-check-circle text-success fs-3"></i>
                      </div>
                      <div>
                        <strong>UI/UX Design:</strong> With <strong>Bootstrap</strong>, we maintain a clean and consistent design across our platform, providing a professional and accessible user interface.
                      </div>
                    </div>
                  </li>
                  <li className="mb-3">
                    <div className="d-flex align-items-start">
                      <div className="me-3">
                        <i className="fas fa-check-circle text-success fs-3"></i>
                      </div>
                      <div>
                        <strong>Cloud Integration:</strong> Utilizing cloud services, we ensure scalable storage and computing, guaranteeing reliability and performance as we grow.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-center text-primary mb-4">Our Team</h2>
            <div className="text-center mb-5">
              <p className="text-muted">
                Our team consists of passionate developers, designers, and business professionals dedicated to creating the best online shopping experience. We are constantly innovating and improving our platform to meet the evolving needs of our users and sellers.
              </p>
            </div>

            <h2 className="text-center text-primary mb-4">Contact Us</h2>
            <div className="text-center mb-5">
              <p className="text-muted">
                We welcome feedback and inquiries. For any questions or support, please reach out to us at:
              </p>
              <ul className="list-unstyled text-center">
                <li className="mb-2"><strong>Email:</strong> <a href="mailto:support@shopease.com" className="text-primary">support@shopease.com</a></li>
                <li className="mb-2"><strong>GitHub:</strong> <a href="https://github.com/your-repo-link" target="_blank" rel="noopener noreferrer" className="text-primary">ShopEase Repository</a></li>
                <li className="mb-2"><strong>Twitter:</strong> <a href="https://twitter.com/ShopEase" target="_blank" rel="noopener noreferrer" className="text-primary">@ShopEase</a></li>
                <li className="mb-2"><strong>LinkedIn:</strong> <a href="https://linkedin.com/company/shopease" target="_blank" rel="noopener noreferrer" className="text-primary">ShopEase</a></li>
              </ul>
            </div>
            
            <div className="text-center">
              <p className="text-muted">
                Thank you for visiting ShopEase. We look forward to serving you and making your online shopping experience exceptional!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
