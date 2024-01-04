const About = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-purple-300 to-100% h-screen pt-8">
      <div className="mx-auto sm:w-1/2 md:w-1/3 xl:w-1/3 2xl:w-1/3">
        <p className="mb-4 text-slate-700 text-center text-xl px-10">
          This is a <strong>MERN </strong>(MongoDB, Express, React, Node.js)
          stack application with authentication. It allows users to sign up, log
          in, and log out, and provides access to protected routes only for
          authenticated users.
        </p>
      </div>
      <div className="mx-auto sm:w-1/2 md:w-1/3 xl:w-1/3 2xl:w-1/3">
        <p className="mb-4 text-slate-700 text-center text-xl px-10">
          The front-end of the application is built with React and uses React
          Router for client-side routing. The back-end is built with Node.js and
          Express, and uses MongoDB as the database. Authentication is
          implemented using JSON Web Tokens (JWT).
        </p>
      </div>
      <div className="mx-auto sm:w-1/2 md:w-1/3 xl:w-1/3 2xl:w-1/3">
        <p className="mb-4 text-slate-700 text-center text-xl px-10">
          This application is intended as a starting point for building
          full-stack web applications with authentication using the MERN stack.
          Feel free to use it as a template for your own projects!
        </p>
      </div>
    </div>
  );
};

export default About;
