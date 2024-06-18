import React from "react";
import MenuButton from "../../components/global/buttons/MenuButton";
import { Helmet } from "react-helmet";

export default function legal() {
  return (
    <>
      <Helmet>
        <title>Legal info</title>
      </Helmet>
      <nav>
        <MenuButton />
      </nav>
      <div>
        <h1>
          Credits and Legal Information for the Belgium Air Force Game App
        </h1>

        <h2>Credits</h2>
        <p>
          The development and maintenance of the Belgium Air Force Game App have
          been made possible through the contributions of the following teams
          and individuals:
        </p>

        <h3>Development Team</h3>
        <di>
          <li>Arno Boenders</li>
          <li>Kevin Dworschak</li>
          <li>Lore Van Den Abeele</li>
          <li>Colin Willems</li>
        </di>

        <h3>Special Thanks</h3>
        <ul>
          <li>
            The Belgium Air Force personnel for their support and insights.
          </li>
        </ul>

        <h2>Legal Information</h2>

        <h3>Disclaimer</h3>
        <p>
          The Belgium Air Force Game App is intended for entertainment purposes
          only. The content within the App, including but not limited to
          scenarios, characters, and storylines, is fictional and not reflective
          of actual operations or personnel of the Belgium Air Force.
        </p>

        <h3>Intellectual Property</h3>
        <p>
          All content within the App, including but not limited to text,
          graphics, logos, icons, images, and software, is the property of the
          Belgium Air Force or its licensors and is protected by international
          copyright, trademark, patent, trade secret, and other intellectual
          property laws.
        </p>

        <h3>Trademarks</h3>
        <p>
          All trademarks, service marks, and trade names are the property of
          their respective owners. The use of any trademarks without the prior
          written consent of the respective owners is strictly prohibited.
        </p>

        <h3>Third-Party Links</h3>
        <p>
          The App may contain links to third-party websites or services that are
          not owned or controlled by the Belgium Air Force. The Belgium Air
          Force has no control over, and assumes no responsibility for, the
          content, privacy policies, or practices of any third-party websites or
          services.
        </p>

        <h3>Governing Law</h3>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of Belgium, without regard to its conflict of law principles. Any
          legal action or proceeding arising under these Terms will be brought
          exclusively in the courts located in Belgium, and you hereby consent
          to the personal jurisdiction and venue therein.
        </p>

        <h2>Contact Information</h2>
        <p>
          For any questions about these credits and legal information, please
          contact the Belgium Air Force at:
        </p>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:support@belgiumairforce.mil">
              support@belgiumairforce.mil
            </a>
          </li>
          <li>
            Address: Belgium Air Force Headquarters, Rue Lambermont 10, 1000
            Brussels, Belgium
          </li>
        </ul>

        <p>
          By using the Belgium Air Force Game App, you acknowledge that you have
          read, understood, and agree to be bound by these credits and legal
          information.
        </p>
      </div>
    </>
  );
}
