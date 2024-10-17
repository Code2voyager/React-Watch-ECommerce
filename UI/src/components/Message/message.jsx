import React from 'react';
import Lottie from 'lottie-react';
import shopping from '../../assets/images/Animation - 1728617752492.json';

function Message() {
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex flex-column flex-md-row align-items-center">
         
          <div className="text-center mx-3 mb-3">
            <h1 className="text-2xl font-bold">Thank you for</h1>
            <div className="flex gap-2 justify-center">
              <button className="btn btn-primary">Want to Continue Shopping?</button>
            </div>
          </div>
       
          <div className="lottie-animation" style={{ width: "300px", height: "300px" }}>
            <Lottie 
              animationData={shopping} 
              loop 
              autoplay 
              style={{ width: "100%", height: "100%" }} 
            />
          </div>
        </div>
      </div>
        
      )
}

export default Message