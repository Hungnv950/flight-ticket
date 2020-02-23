import React from "react";

class Signin extends React.Component {
  render() {
      return (
        <main className="main">
          <div className="container">
            <div className="row-custom">
              <form className="form-signin">
                <h2 className="form-signin-heading"> Please sign in </h2>
                <label className="sr-only"> Email address
                </label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
                <label className="sr-only"> Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                <button className="price__btn btn btn--bg-linear btn--medium" type="button"> Sign in
                </button>
            </form>
            </div>
          </div>
        </main>
      )
  }
}

export default Signin