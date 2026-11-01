import { Link } from "react-router-dom";
import { SOCIAL } from "@/data/content";

const Footer = () => (
  <footer className="mc-footer">
    <div className="mc-footer__grass" aria-hidden="true" />
    <div className="mc-footer__body mc-bg-dirt">
      <div className="mc-container">
        <div className="mc-footer__grid">
          <div>
            <h3>NEXTUP STUDIO</h3>
            <p>
              Your ultimate destination for Minecraft worlds, addons, shaders and the newest Bedrock builds. Crafted for the community
              by Vanshu Agarwal.
            </p>
          </div>

          <div>
            <h3>EXPLORE</h3>
            <ul>
              <li><Link to="/worlds">Worlds</Link></li>
              <li><Link to="/addons">Addons</Link></li>
              <li><Link to="/shaders">Shaders</Link></li>
              <li><Link to="/downloads">Downloads</Link></li>
              <li><Link to="/beta">Beta</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3>CONTACT</h3>
            <ul>
              <li><a href={`mailto:${SOCIAL.email}`}>{SOCIAL.email}</a></li>
              <li><a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer">YouTube @nextupstudioyt</a></li>
              <li><a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">Instagram @hereyourchampion</a></li>
              <li><a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">GitHub shreyagarwal72</a></li>
            </ul>
          </div>
        </div>

        <div className="mc-footer__legal">
          <span>© 2026 Nextup Studio. All rights reserved.</span>
          <span>Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
