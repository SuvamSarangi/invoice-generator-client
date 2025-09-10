import React from "react";
import "./LandingPage.css";
import {assets} from '../../assets/assets.js';

const LandingPage = () => {
  return (
    <>
      <header id="hero" className="hero-section text-white text-center">
        <div
          className="container py-5 d-flex flex-column justify-content-center"
          style={{}}
        >
          <div className="row py-lg-5">
            <div className="col-lg-9 col-md-10 mx-auto">
              <h1 className="display-3 fw-bold mb-4">
                Effortless invoiceing, Profecional Results
              </h1>

              <p className="lead mb-5" style={{ fontSize: "1.3rem" }}>
                Stop wasting time with spreadsheets. Quickinvoice helps you to
                create invoice
              </p>

              <p>
                <button className="btn btn-lg btn-warning fw-bold rounded-pill my-2 mx-1 px-5 py-3">
                  Generate your first invoice
                </button>
                <a
                  href="#how-it-works"
                  className="btn btn-lg btn-outline-light rounded-pill my-2 mx-1 px-5 py-3"
                >
                  Learn More
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <section id="how-it-works" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 display-5 fw-bold ">
            Get Started In 4 Simple Stages
          </h2>
          <div className="row g-4 justify-content-center">
            {/* card-1 */}
            <div className="col-md-6 col-lg-3 d-flex ">
              <div className="card  card-hover h-100 shadow-sm border-0 text-center flex-fill">
                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4"style={{backgroundColor:"#BFC8D7"}}>
                  <img src={assets.one} className="rounded-circle" alt="details" />
                </div>
                {/* card body */}
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-2 fs-5">Enter Details</h5>
                  <p className="card-text text-muted small">Quickly fill in your client information,description,price.</p>
                </div>
              </div>
            </div>
            {/* card-2 */}
              <div className="col-md-6 col-lg-3 d-flex">
              <div className="card card-hover  h-100 shadow-sm border-0 text-center flex-fill">
                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4" style={{backgroundColor:"#BAC3BF"}}>
                  <img src={assets.two} className="rounded-circle" alt="" />
                </div>
                {/* card body */}
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-2 fs-5">Choose Template</h5>
                  <p className="card-text text-muted small">Choose Professionally designed templates pick one that matches your brand and style.</p>
                </div>
              </div>
            </div>
            {/* card-3 */}
               <div className="col-md-6 col-lg-3 d-flex">
              <div className="card  card-hover h-100 shadow-sm border-0 text-center flex-fill">
                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4" style={{backgroundColor:"#D1C8B0"}}>
                  <img src={assets.three} className="rounded-circle" alt="" />
                </div>
                {/* card body */}
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-2 fs-5">Preview Invoice</h5>
                  <p className="card-text text-muted small">See exactly how you invoice will look before sending it.Make any last -minute adjustments with ease.</p>
                </div>
              </div>
            </div>
            {/* card-4 */}
              <div className="col-md-6 col-lg-3 d-flex">
              <div className="card card-hover  h-100 shadow-sm border-0 text-center flex-fill">
                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4" style={{backgroundColor:"#C3D6D9"}}>
                  <img src={assets.four} className="rounded-circle" alt="" />
                </div>
                {/* card body */}
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-2 fs-5">Download & Save</h5>
                  <p className="card-text text-muted small">Download your invoice as a pdf,send directly via email or save it for your records and future reference</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
