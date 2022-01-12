function App() {
  return (
    <div className="app">
      <div className="window">
        <span className="window__logo">Logo</span>
        <span className="window__heading">
          Join thousands of learners from around the world{' '}
        </span>
        <p className="window__text">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </p>
        <form className="window__form">
          <input className="input" type="email" placeholder="Email" />
          <input className="input" type="password" placeholder="Password" />
          <button className="button" type="submit"></button>
        </form>
        <span className="window__message">
          or continue with these social profiles
        </span>
        <div className="window__socials"></div>
        <span className="window__prompt">
          Already a member? <span className="link">Login</span>
        </span>
      </div>
    </div>
  );
}

export default App;
