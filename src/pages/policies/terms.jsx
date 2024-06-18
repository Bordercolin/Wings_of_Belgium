import React from "react";
import MenuButton from "../../components/global/buttons/MenuButton";
import { Helmet } from "react-helmet";

export default function terms() {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions</title>
      </Helmet>
      <nav>
        <MenuButton />
      </nav>
      <div>
        <h1>
          Terms and Conditions for the Use of the Belgium Air Force Game App
        </h1>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By downloading, installing, and using the Belgium Air Force Game App
          ("the App"), you agree to comply with and be bound by these Terms and
          Conditions ("Terms"). If you do not agree to these Terms, do not use
          the App.
        </p>

        <h2>2. License Grant</h2>
        <p>
          The Belgium Air Force grants you a non-exclusive, non-transferable,
          revocable license to use the App for personal, non-commercial
          purposes, subject to these Terms.
        </p>

        <h2>3. Eligibility</h2>
        <p>
          You must be at least 13 years old to use the App. By using the App,
          you represent and warrant that you meet this age requirement.
        </p>

        <h2>4. User Conduct</h2>
        <p>
          You agree to use the App only for lawful purposes and in accordance
          with these Terms. You agree not to:
        </p>
        <ul>
          <li>
            Use the App in any manner that could interfere with, disrupt,
            negatively affect, or inhibit other users from fully enjoying the
            App.
          </li>
          <li>Use the App for any illegal or unauthorized purpose.</li>
          <li>Modify, adapt, hack, or emulate the App.</li>
          <li>
            Use any automated system, including but not limited to robots,
            spiders, or offline readers, to access the App.
          </li>
        </ul>

        <h2>5. Privacy Policy</h2>
        <p>
          Your use of the App is also governed by our Privacy Policy, which is
          incorporated by reference into these Terms. Please review our Privacy
          Policy to understand our practices regarding the collection, use, and
          disclosure of your personal information.
        </p>

        <h2>6. Intellectual Property</h2>
        <p>
          All content, features, and functionality of the App, including but not
          limited to text, graphics, logos, icons, images, and software, are the
          exclusive property of the Belgium Air Force or its licensors and are
          protected by international copyright, trademark, patent, trade secret,
          and other intellectual property laws.
        </p>

        <h2>7. Updates and Changes to the App</h2>
        <p>
          The Belgium Air Force reserves the right to modify, suspend, or
          discontinue, temporarily or permanently, the App or any service to
          which it connects, with or without notice and without liability to
          you.
        </p>

        <h2>8. Termination</h2>
        <p>
          The Belgium Air Force may terminate or suspend your access to the App
          at any time, without prior notice or liability, for any reason,
          including if you breach any of the Terms. Upon termination, your right
          to use the App will immediately cease.
        </p>

        <h2>9. Disclaimer of Warranties</h2>
        <p>
          The App is provided on an "AS IS" and "AS AVAILABLE" basis. The
          Belgium Air Force makes no representations or warranties of any kind,
          express or implied, regarding the operation or availability of the
          App, or the information, content, and materials included therein. To
          the fullest extent permitted by applicable law, the Belgium Air Force
          disclaims all warranties, express or implied, including but not
          limited to implied warranties of merchantability, fitness for a
          particular purpose, and non-infringement.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, in no event shall
          the Belgium Air Force be liable for any indirect, incidental, special,
          consequential, or punitive damages, including but not limited to loss
          of profits, data, use, goodwill, or other intangible losses, arising
          out of or in connection with your use of or inability to use the App.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of Belgium, without regard to its conflict of law principles. Any
          legal action or proceeding arising under these Terms will be brought
          exclusively in the courts located in Belgium, and you hereby consent
          to the personal jurisdiction and venue therein.
        </p>

        <h2>12. Changes to Terms</h2>
        <p>
          The Belgium Air Force reserves the right to modify these Terms at any
          time. Your continued use of the App following the posting of changes
          will constitute your acceptance of such changes. It is your
          responsibility to review these Terms periodically for updates.
        </p>

        <h2>13. Contact Information</h2>
        <p>
          For any questions about these Terms, please contact the Belgium Air
          Force at:
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
          read, understood, and agree to be bound by these Terms and Conditions.
        </p>
      </div>
    </>
  );
}
