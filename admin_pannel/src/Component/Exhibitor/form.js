

function a() {
    return (
<div className="content-body">
  <div className="row page-titles mx-0">
    <div className="col p-md-0">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
        <li className="breadcrumb-item active"><a href="javascript:void(0)">Home</a></li>
      </ol>
    </div>
  </div>
  {/* row */}
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
        <form action="#" id="step-form-horizontal" className="step-form-horizontal">
          <div>
            <h4>Account Details</h4>
            <section>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <input type="text" name="username" className="form-control" placeholder="Username" required />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input type="email" name="email" className="form-control" placeholder="Email" required />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input type="password" name="Password" className="form-control" placeholder="Password" required />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" required />
                  </div>
                </div>
              </div>
            </section>
            <h4>Your Address</h4>
            <section>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <input type="text" name="firstName" className="form-control" placeholder="First Name" required />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input type="text" name="lastName" className="form-control" placeholder="Last Name" required />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <input type="text" name="address" className="form-control" placeholder="Address" required />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input type="text" name="city" className="form-control" placeholder="City" required />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input type="text" name="zip" className="form-control" placeholder="ZIP Code" required />
                  </div>
                </div>
              </div>
            </section>
            <h4>Billing Details</h4>
            <section>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <input className="form-control" type="text" name="creditCard" placeholder="Credit Card Number" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <input className="form-control" type="text" name="date" placeholder="Expiration Date" />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input className="form-control" type="text" name="owner" placeholder="Credit Card Owner" />
                  </div>
                </div>
              </div>
            </section>
            <h4>Confirmation</h4>
            <section>
              <div className="row h-100">
                <div className="col-12 h-100 d-flex flex-column justify-content-center align-items-center">
                  <h2>You have submitted form successfully!</h2>
                  <p>Thank you very much for you information. we will procceed accordingly.</p>
                </div>
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* #/ container */}
</div>


    );
}

export default a;
