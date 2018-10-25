import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginAction } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginAction(loginData);

    /*
    axios
      .post("/api/users/login", loginData)
      .then(res => console.log(res.data))
      .catch(err => (this.state.errors = err.response.data));*/
    console.log(loginData);
  }

  render() {
    const errors = this.state.errors;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your MiniMERN account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {!errors.email && (
                    <div className="invalid-feedback">Err {errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { loginAction }
)(Login);
