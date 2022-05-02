export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <a href="login" className="btn btn-custom btn-lg page-scroll">
                  Sign In
                </a>{" "}
                <br/><br></br>
                <a href="path/to/app-debug.apk" className="btn btn-custom btn-lg page-scroll" download rel="noopener noreferrer" target="_blank">
                  Download Mobile App
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
