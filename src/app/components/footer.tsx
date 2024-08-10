import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
  return (
    <footer className="text-white bg-primary py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">ShopEase</h5>
            <p>
              ShopEase is an advanced e-commerce application built on Next.js, providing a seamless and efficient shopping experience. 
              Utilizing the latest web technologies, ShopEase ensures fast loading times, responsive design, and a user-friendly interface.
            </p>
          </div>
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/discover" className="text-light text-decoration-none">Discover</a></li>
              <li><a href="/Orders" className="text-light text-decoration-none">Your Orders</a></li>
              <li><a href="/Profile" className="text-light text-decoration-none">Profile</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center">
                <i className="bi bi-geo-alt me-2"></i>
                <span>123 Main Street, City, Country</span>
              </li>
              <li className="d-flex align-items-center">
                <i className="bi bi-telephone me-2"></i>
                <span>(123) 456-7890</span>
              </li>
              <li className="d-flex align-items-center">
                <i className="bi bi-envelope me-2"></i>
                <span>info@shopease.com</span>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex">
              <a href="#" className="text-light text-decoration-none me-3">
              <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="text-light text-decoration-none me-3">
              <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#" className="text-light text-decoration-none me-3">
              <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="text-light text-decoration-none">
              <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="mb-0">&copy; 2024 ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
