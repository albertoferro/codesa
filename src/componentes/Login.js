import React, { Component } from 'react'


export default class Login extends Component {
    render() {
        return (
            <div>
                <br/>
                <div className="container row text-center">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto card card-signin my-5">
                   
                    <div className="card-body">
                    <i className="fas fa-user-circle fa-7x"></i>
                    

                    <form className="form-signin form-label-group">
                    <input type="text" id="login" className="form-control" name="login" placeholder="Usuario"/>
                    <input type="text" id="password" className="form-control" name="login" placeholder="Contraseña"/>
                    <input type="submit" className="btn btn-lg btn-primary btn-block text-uppercase" value="Ingresar"/>
                    </form>

                   
                    <div id="custom-control custom-checkbox mb-3">
                    <a class="custom-control-labe" href="#">Olvidaste tu Password?</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>

        )
    }
}
