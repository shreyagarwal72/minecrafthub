import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import McButton from "@/components/McButton";

const NotFound = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.error("404 Error: user attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <Layout title="404 - You Died!" background="stone">
      <div className="mc-death">
        <div>
          <h1 className="mc-death__title">You died!</h1>
          <p className="mc-death__msg">
            Page <span className="t-yellow">{pathname}</span> fell into the void.
          </p>
          <p className="mc-death__score">
            Score: <b>404</b>
          </p>
          <div className="mc-death__actions">
            <McButton to="/" variant="green" block>
              Respawn (Home)
            </McButton>
            <McButton to="/downloads" block>
              Browse Downloads
            </McButton>
            <McButton to="/faq" block variant="dark">
              Ask the FAQ
            </McButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
